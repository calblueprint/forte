class TeacherForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      password_confirmation: null,
      first_name: null,
      last_name: null,
      city: null,
      gender: null,
      birthday: null,
      school: null,
      school_level: null,
      phone: null,
      email: null,
      introduction: null,
      teaching_experience: null,
      training_experience: null,
      performance_experience: null,
      address: null,
      address2: null,
      state: null,
      zipcode: null,
      location_preference: false,
      travel_distance: null,
      availability: null,
      background_check: null,
      reference1_first_name: null,
      reference1_last_name: null,
      reference1_relation: null,
      reference1_email: null,
      reference1_phone: null,
      reference2_first_name: null,
      reference2_last_name: null,
      reference2_relation: null,
      reference2_email: null,
      reference2_phone: null,
      criminal_charges: null,
      youth_participation: null,
      criminal_explanation: null,
      waiver_signature: null,
      waiver_date: null,
      teach_for_free: false,
      stripe_country: null,
      stripe_routing_number: null,
      stripe_account_number: null,
      stripe_account_holder_name: null,
      stripe_account_holder_type: null,
      stripe_account_holder_dob: null,
      stripe_address_line1: null,
      stripe_address_city: null,
      stripe_address_state: null,
      stripe_address_postal_code: null,
      stripe_ssn_last_4: null,
      activeInstruments: [],
      instruments: {},
      lat: null,
      lng: null,
      showWaiverModal: false,
      errors: {},
      loading: false,
    }
  }

  componentDidMount() {
    // set up active instruments object
    var activeInstruments = {}
    const hash = window.location.hash.replace("#", "");

    for (var i = 0; i < INSTRUMENTS.length; i++) {
      let item = INSTRUMENTS[i];

      if (item === hash) {
        activeInstruments[item] = true;
      } else {
        activeInstruments[item] = false;
      }
    }

    this.setState({ activeInstruments: activeInstruments });

    // set up instruments fields object
    var instruments = {}
    for (var i = 0; i < INSTRUMENTS.length; i++) {
      instruments[INSTRUMENTS[i]] = {
        proficiency: null,
        years_played: null,
      };
    }
    this.setState({ instruments: instruments });
  }

  getValidationState(name) {
    if (this.state.errors[name]) {
      return 'error';
    }
  }

  displayErrorMessage(name) {
    if (this.state.errors[name]) {
      return <HelpBlock className="error-message">{this.state.errors[name]}</HelpBlock>;
    }
  }

  handleChange(event) {
    var name = $(event.target).attr("name");
    var value = $(event.target).val();
    this.setState({ [name] : value });
  }

  handleBooleanChange(event) {
    const name = $(event.target).attr("name");
    var value = $(event.target).val();
    value = (value == "true");
    this.setState({ [name] : value });
  }

  handleCheckboxChange(event) {
    const name = $(event.target).attr("name");
    var value = this.state[name];
    value = (!value);
    this.setState({ [name] : value });
  }

  handleIntegerChange(event) {
    const name = $(event.target).attr("name");
    var value = $(event.target).val();
    value = parseInt(value);
    this.setState({ [name] : value });
  }

  handleDatetimeChange(moment, name) {
    if (name == 'birthday') {
      this.setState({ birthday: moment });
    } else if (name == 'waiver_date') {
      this.setState({ waiver_date: moment });
    } else if (name == 'stripe_account_holder_dob') {
      this.setState({ stripe_account_holder_dob: moment });
    }
  }

  handleInstrumentFieldChange(event, instrument) {
    const name = $(event.target).attr("name");
    var value = $(event.target).val();
    value = parseInt(value);
    this.setState({
      instruments: update(this.state.instruments, {[instrument]: {[name]: {$set: value}}}),
    });
  }

  handleCountryChange(event) {
    const name = $(event.target).attr("name");
    var value = $(event.target).val();
    for (var i = 0; i < COUNTRY_CODES.length; i++) {
      if (COUNTRY_CODES[i].name == value) {
        value = COUNTRY_CODES[i].code
        this.setState({ [name] : value})
        return;
      }
    }
  }

  handleInstrumentClick(event) {
    const { instruments, activeInstruments } = this.state;
    const instrument = event.target.textContent;
    const currentState = activeInstruments[instrument];
    this.setState({
      activeInstruments: update(this.state.activeInstruments, {[instrument]: {$set: !currentState}}),
    });
  }

  handleAddressChange(event) {

    function fillInAddress() {
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        postal_code: 'short_name'
      };

      var place = autocomplete.getPlace();
      var lat = place["geometry"]["location"]["lat"]();
      var lng = place["geometry"]["location"]["lng"]();
      this.setState({ lat: lat, lng: lng });

      // Get each component of the address from the place details
      // and fill the corresponding field on the form.
      var street_number, street_name;
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          switch(addressType) {
            case "administrative_area_level_1":
              val = STATES.indexOf(val);
              document.getElementById(addressType).value = val;
              this.setState({ state: val });
              break;
            case "street_number":
              street_number = val;
              break;
            case "route":
              street_name = val;
              break;
            case "locality":
              document.getElementById(addressType).value = val;
              this.setState({ city: val });
              break;
            case "postal_code":
              document.getElementById(addressType).value = val;
              this.setState({ zipcode: val });
              break;
          }
        }
      }
      if (street_number && street_name) {
        val = street_number + " " + street_name;
        document.getElementById("address").value = val;
        this.setState({ address: val });
      }
    }

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById("address"));
    this.geolocate(autocomplete);
    autocomplete.addListener("place_changed", fillInAddress.bind(this));
    this.handleChange(event);
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  geolocate(autocomplete) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  openWaiver() {
    this.setState({ showWaiverModal: true });
  }

  closeWaiver() {
    this.setState({ showWaiverModal: false });
  }

  stopLoading() {
    this.setState({ loading : false });
  }

  setAvailability() {
    const { calendar } = this.refs.availability.refs
    //TODO: not ideal way to do this.. figure out some other way
    var eventArray = $(calendar).fullCalendar('clientEvents');
    var availabilityArray = []
    for (var i = 0; i < eventArray.length; i++) {
      availabilityArray = availabilityArray.concat(range_to_array(eventArray[i]['start'], eventArray[i]['end']));
    }
    this.setState({
      availability: availabilityArray,
      loading: true
    })
  }

  setInstruments() {
    const { instruments, activeInstruments } = this.state;
    var instrumentsObj = [];
    for (let [instrumentName, active] of Object.entries(activeInstruments)) {
      if (active == true) {
        var instrument = Object.assign({}, {name: instrumentName}, instruments[instrumentName]);
        instrumentsObj.push(instrument);
      }
    }
    this.setState({ instruments_attributes: instrumentsObj });
  }

  /* Back-end Validtions for Teacher Fields */
  validateTeacherFields() {

    var reject = (response) => {
      this.createStripeAccount(response);
    }
    var resolve = (response) => {
      this.createStripeAccount({});
    };

    var params = {
      teacher: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        city: this.state.city,
        gender: this.state.gender,
        birthday: this.state.birthday,
        school: this.state.school,
        school_level: this.state.school_level,
        phone: this.state.phone,
        email:this.state.email,
        teach_for_free: this.state.teach_for_free,
        introduction: this.state.introduction,
        teaching_experience: this.state.teaching_experience,
        training_experience: this.state.training_experience,
        performance_experience: this.state.performance_experience,
        address: this.state.address,
        address2: this.state.address2,
        state: this.state.state,
        zipcode: this.state.zipcode,
        location_preference: this.state.location_preference,
        travel_distance: this.state.travel_distance,
        availability: this.state.availability,
        background_check: this.state.background_check,
        reference1_first_name: this.state.reference1_first_name,
        reference1_last_name: this.state.reference1_last_name,
        reference1_relation: this.state.reference1_relation,
        reference1_email: this.state.reference1_email,
        reference1_phone: this.state.reference1_phone,
        reference2_first_name: this.state.reference2_first_name,
        reference2_last_name: this.state.reference2_last_name,
        reference2_relation: this.state.reference2_relation,
        reference2_email: this.state.reference2_email,
        reference2_phone: this.state.reference2_phone,
        criminal_charges: this.state.criminal_charges,
        youth_participation: this.state.youth_participation,
        criminal_explanation: this.state.criminal_explanation,
        waiver_signature: this.state.waiver_signature,
        waiver_date: this.state.waiver_date,
        instruments_attributes: this.state.instruments_attributes,
      }
    };

    if (!this.state.lat && !this.state.lng) {
      const { address, address_apt, city, state, zipcode } = this.state;
      var geocoder = new google.maps.Geocoder();
      var full_address = [address, address_apt, city, state, zipcode].join(" ");
      geocoder.geocode({"address": full_address}, function(results, status) {
        if (status === 'OK') {
          var location = results[0]["geometry"]["location"];
          var lat = location["lat"]();
          var lng = location["lng"]();
          this.setState({ lat: lat, lng: lng });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      }.bind(this));
    }

    Requester.post(
      ApiConstants.teachers.validate,
      params,
      resolve,
      reject
    );
  }

  async createStripeAccount(teacher_errs) {
    const {
      stripe_country,
      stripe_routing_number,
      stripe_account_number,
      stripe_account_holder_name,
      stripe_account_holder_type,
      teach_for_free,
    } = this.state;

    if (!teach_for_free) {
      var validate_stripe_response = await this.validateTeacherAndStripeCustomer(stripe_routing_number, stripe_account_number, stripe_country, teacher_errs);

      // Only create customer if stripe validations pass - do not create token if there are stripe errors
      if (validate_stripe_response) {
        Stripe.bankAccount.createToken({
          country: stripe_country,
          currency: 'USD',
          routing_number: stripe_routing_number,
          account_number: stripe_account_number,
          account_holder_name: stripe_account_holder_name,
          account_holder_type: stripe_account_holder_type
        }, this.stripeResponseHandler.bind(this));
      } else {
        this.stopLoading();
      }
    } else {
      var teacher_instrument_errs = await this.validateTeacherAndInstruments(teacher_errs);

      if (!(Object.keys(teacher_instrument_errs).length === 0)) {
        this.stopLoading();
      } else {
        this.createTeacher();
      }
    }
  }

  stripeResponseHandler(status, response) {
    const reject = (response) => { console.log(response) };
    const resolve = ((response) => { this.createTeacher(response) });

    if (response.error) {
      console.log(response.error);
    } else {
      var params = {
        stripe_token: response.id,
        email: this.state.email,
        country: this.state.stripe_country,
      };
      Requester.post(
        ApiConstants.stripe.createAccount,
        params,
        resolve,
        reject
      );
    }
  }

  async validateTeacherAndInstruments(teacher_errs) {
    var error_info = {};
    // var validated = true;

    var instrument_errors = await this.validateInstruments();
    // if (!(Object.keys(teacher_errs).length === 0) || !(Object.keys(instrument_errors).length === 0)) {
    //   validated = false;
    // }

    error_info = Object.assign(error_info, teacher_errs, instrument_errors);
    // this.setState({ errors: error_info });
    return error_info;
  }

  /**
   * Sets the state of errors to be the errored fields returned from stripeValidateFields
   * @param stripe_routing_number
   * @param stripe_account_number
   * @param stripe_country
   * @param teacher_errs
   */
  async validateTeacherAndStripeCustomer(stripe_routing_number, stripe_account_number, stripe_country, teacher_errs) {

    var payment_errs = await this.stripeValidateFields(stripe_routing_number, stripe_account_number, stripe_country);
    var teacher_instrument_errs = await this.validateTeacherAndInstruments(teacher_errs);

    var error_info = {};
    var validated = true;
    for (var err_type in payment_errs) {
      //TODO: Find JS function to identify false values instead
      if (!payment_errs[err_type][0]) {
        validated = false;
        error_info[err_type] = payment_errs[err_type][1];
      }
    }
    if (!(Object.keys(teacher_instrument_errs).length === 0)) {
      validated = false;
    }
    error_info = Object.assign(error_info, teacher_instrument_errs);
    this.setState({ errors: error_info });
    return validated;
  }

  /**
   * Front-end validation for instrument_attributes field
   */
  validateInstruments() {
    const {
      instruments_attributes,
    } = this.state;

    var errors = {};

    if (!(instruments_attributes.length)) {
      errors.instruments = "Can't Be Blank";
    } else {
      for (var i = 0; i < instruments_attributes.length; i++) {
        if ((instruments_attributes[i]['name'] == null) || (instruments_attributes[i]['proficiency'] == null) ||
          (instruments_attributes[i]['years_played'] == null)) {
            errors.instruments = "Can't Be Blank";
        }
      }
    }
    return errors;
  }

  /**
   * Calls Stripe validations on the inputted payment information
   * @param stripe_routing_number
   * @param stripe_account_number
   * @param stripe_country
   */
  stripeValidateFields(stripe_routing_number, stripe_account_number, stripe_country) {

    var routing_num_err = Stripe.bankAccount.validateRoutingNumber(stripe_routing_number, stripe_country);
    var account_num_err = Stripe.bankAccount.validateAccountNumber(stripe_account_number, stripe_country);

    var routing_num_err_msg = (routing_num_err && !stripe_country) ? "Please make sure Bank Account Country is not blank" :  "Please enter a valid routing number";
    var account_num_err_msg = (account_num_err && !stripe_country) ? "Please make sure Bank Account Country is not blank" : "Please enter a valid account number";

    if (!stripe_country) {
      routing_num_err = false;
      account_num_err = false;
    }

    var payment_errs = {};

    payment_errs.stripe_account_holder_name = [this.state.stripe_account_holder_name, "Can't be blank"];
    payment_errs.stripe_account_holder_type = [this.state.stripe_account_holder_type, "Can't be blank"];
    payment_errs.stripe_account_holder_dob = [this.state.stripe_account_holder_dob, "Can't be blank"];
    payment_errs.stripe_address_line1 = [this.state.stripe_address_line1, "Can't be blank"];
    payment_errs.stripe_address_city = [this.state.stripe_address_city, "Can't be blank"];
    payment_errs.stripe_address_state = [this.state.stripe_address_state, "Can't be blank"];
    payment_errs.stripe_address_postal_code = [this.state.stripe_address_postal_code, "Can't be blank"];
    payment_errs.stripe_ssn_last_4 = [this.state.stripe_ssn_last_4, "Can't be blank"];
    payment_errs.stripe_country = [this.state.stripe_country, "Can't be blank"];
    payment_errs.stripe_routing_number = [routing_num_err, routing_num_err_msg];
    payment_errs.stripe_account_number = [account_num_err, account_num_err_msg];

    return payment_errs;
  }

  verifyStripeAccount(teacher) {
    const {
      stripe_account_holder_type,
      waiver_date,
      stripe_account_holder_dob,
      stripe_address_line1,
      stripe_address_city,
      stripe_address_postal_code,
      stripe_address_state,
      stripe_ssn_last_4,
    } = this.state
    const reject = (response) => { console.log(response) };
    const resolve = ((response) => {
      this.stopLoading();
      window.location.href = "/"
    });

    var params = {
      dob_day: stripe_account_holder_dob.date(),
      // moment month is zero indexed
      dob_month: stripe_account_holder_dob.month() + 1,
      dob_year: stripe_account_holder_dob.year(),
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      type: stripe_account_holder_type.toLowerCase(),
      tos_acceptance_date: waiver_date.unix(),
      tos_acceptance_ip: teacher.sign_up_ip,
      account_id: teacher.account_id,
      address_city: stripe_address_city,
      address_line_1: stripe_address_line1,
      address_postal_code: stripe_address_postal_code,
      address_state: stripe_address_state,
      ssn_last_4: stripe_ssn_last_4,
    };

    Requester.post(
      ApiConstants.stripe.verifyAccount,
      params,
      resolve,
      reject
    );
  }

  createTeacher(accountResponse) {
    const { teach_for_free } = this.state;
    var reject = (response) => {
      this.setState({
        errors: response.errors,
        loading: false
      });
    }
    var resolve = (response) => {
      if (teach_for_free) {
        this.stopLoading();
        window.location.href = "/";
      } else {
        this.verifyStripeAccount(response);
      }
    };

    var params = {
      teacher: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        city: this.state.city,
        gender: this.state.gender,
        birthday: this.state.birthday,
        school: this.state.school,
        school_level: this.state.school_level,
        phone: this.state.phone,
        email:this.state.email,
        introduction: this.state.introduction,
        teaching_experience: this.state.teaching_experience,
        training_experience: this.state.training_experience,
        performance_experience: this.state.performance_experience,
        address: this.state.address,
        address2: this.state.address2,
        state: this.state.state,
        zipcode: this.state.zipcode,
        location_preference: this.state.location_preference,
        teach_for_free: this.state.teach_for_free,
        travel_distance: this.state.travel_distance,
        availability: this.state.availability,
        background_check: this.state.background_check,
        reference1_first_name: this.state.reference1_first_name,
        reference1_last_name: this.state.reference1_last_name,
        reference1_relation: this.state.reference1_relation,
        reference1_email: this.state.reference1_email,
        reference1_phone: this.state.reference1_phone,
        reference2_first_name: this.state.reference2_first_name,
        reference2_last_name: this.state.reference2_last_name,
        reference2_relation: this.state.reference2_relation,
        reference2_email: this.state.reference2_email,
        reference2_phone: this.state.reference2_phone,
        criminal_charges: this.state.criminal_charges,
        youth_participation: this.state.youth_participation,
        criminal_explanation: this.state.criminal_explanation,
        waiver_signature: this.state.waiver_signature,
        waiver_date: this.state.waiver_date,
        instruments_attributes: this.state.instruments_attributes,
        lat: this.state.lat,
        lng: this.state.lng,
      }
    };

    if (!teach_for_free) {
      params.teacher.account_id = accountResponse.account.id
      params.teacher.bank_id = accountResponse.bank_account.id
    }

    Requester.post(
      ApiConstants.authentication.signup.teacher,
      params,
      resolve,
      reject
    );
  }

  // createTeacher is called after stripeResponseHandler resolves.
  async submitForm() {
    await this.setAvailability();
    await this.setInstruments();
    await this.validateTeacherFields();
  }

  renderOptions(type) {
    var optionsArray = []
    var retOptions = []
    switch(type) {
      case 'gender':
        optionsArray = GENDERS;
        break;
      case 'school_level':
        optionsArray = TEACHER_SCHOOL_LEVELS;
        break;
      case 'state':
        optionsArray = STATES;
        break;
      case 'travel_distance':
        optionsArray = TRAVEL_DISTANCES;
        break;
      case 'proficiency':
        optionsArray = PROFICIENCY;
        break;
      case 'years_played':
        optionsArray = YEARS_PLAYED;
        break;
      case 'account_holder_type':
        for (var i = 0; i < ACCOUNT_HOLDER_TYPE.length; i++) {
          retOptions.push(<option value={ACCOUNT_HOLDER_TYPE[i]}>{ACCOUNT_HOLDER_TYPE[i]}</option>);
        }
        return retOptions
      case 'country':
        for (var i = 0; i < COUNTRY_CODES.length; i++) {
          retOptions.push(<option value={COUNTRY_CODES[i].name}>{COUNTRY_CODES[i].name}</option>);
        }
        return retOptions
    }
    for (var i = 0; i < optionsArray.length; i++) {
      retOptions.push(<option value={i}>{optionsArray[i]}</option>);
    }
    return retOptions;
  }

  renderInstrumentButtons() {
    const { activeInstruments } = this.state
    var buttons = []
    for (var i = 0; i < INSTRUMENTS.length; i++) {
      var instrument = INSTRUMENTS[i]
      var className = activeInstruments[instrument] ? 'button button--static-clicked button--sm':'button button--static button--sm';
      buttons.push(<div className={className} onClick={(event) =>
        this.handleInstrumentClick(event)}>{INSTRUMENTS[i]}</div>);
    }
    return buttons;
  }

  renderInstrumentFields(instrument) {
    return (
      <div key={instrument}>
        <h4 className="instrument-title">{instrument}</h4>
        <div className="form-row">
          <FormGroup>
            <ControlLabel>Proficiency</ControlLabel>
            <FormControl
              componentClass="select"
              name="proficiency"
              onChange={(event) => this.handleInstrumentFieldChange(event, instrument)}>
              <option value="" disabled selected>Select a value</option>
              {this.renderOptions('proficiency')}
            </FormControl>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Years Played</ControlLabel>
            <FormControl
              componentClass="select"
              name="years_played"
              onChange={(event) => this.handleInstrumentFieldChange(event, instrument)}>
              <option value="" disabled selected>Select a value</option>
                {this.renderOptions('years_played')}
            </FormControl>
          </FormGroup>
        </div>
      </div>
    );
  }

  renderInstrumentsFields() {
    var instrumentsFields = []
    const { activeInstruments } = this.state
    for (var i = 0; i < INSTRUMENTS.length; i++) {
      if (activeInstruments[INSTRUMENTS[i]] == true) {
        instrumentsFields.push(this.renderInstrumentFields(INSTRUMENTS[i]));
      }
    }
    return instrumentsFields;
  }

  renderWaiverModal() {
    const { showWaiverModal, teach_for_free } = this.state;
    if (showWaiverModal == true) {
      return (
        <WaiverModal handleClose={() => this.closeWaiver()} teachForFree={teach_for_free} />
      );
    }
  }

  renderPaymentField() {
    const { teach_for_free } = this.state;
    if (!teach_for_free) {
      return(
        <div>
          <h2 className="section-title">Payment</h2>
            <div className="form-row">
              <FormGroup validationState={this.getValidationState("stripe_account_holder_name")}>
                <ControlLabel>Bank Account Holder Name</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter Bank Account Holder Name"
                  name="stripe_account_holder_name"
                  onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("stripe_account_holder_name")}
              </FormGroup>
              <FormGroup validationState={this.getValidationState("stripe_account_holder_dob")}>
                <ControlLabel>Bank Account Holder DOB</ControlLabel>
                <Datetime
                  dateFormat="MM/DD/YYYY"
                  timeFormat={false}
                  inputProps={{placeholder: "MM/DD/YYYY"}}
                  onChange={(moment) => this.handleDatetimeChange(moment, 'stripe_account_holder_dob')}/>
                {this.displayErrorMessage("stripe_account_holder_dob")}
              </FormGroup>
            </div>
            <FormGroup validationState={this.getValidationState("stripe_account_holder_type")}>
              <ControlLabel>Bank Account Holder Type</ControlLabel>
              <FormControl
                componentClass="select"
                name="stripe_account_holder_type"
                onChange={(event) => this.handleChange(event)}>
                <option value="" disabled selected>Select Account Type</option>
                {this.renderOptions('account_holder_type')}
              </FormControl>
              {this.displayErrorMessage("stripe_account_holder_type")}
            </FormGroup>
            <div className="form-row">
              <FormGroup validationState={this.getValidationState("stripe_routing_number")}>
                <ControlLabel>Routing Number</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter Routing Number"
                  name="stripe_routing_number"
                  onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("stripe_routing_number")}
              </FormGroup>
              <FormGroup validationState={this.getValidationState("stripe_account_number")}>
                <ControlLabel>Bank Account Number</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter Bank Account Number"
                  name="stripe_account_number"
                  onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("stripe_account_number")}
              </FormGroup>
            </div>
            <FormGroup validationState={this.getValidationState("stripe_address_line1")}>
              <ControlLabel>Address</ControlLabel>
              <FormControl
                componentClass="input"
                placeholder="Enter Address Associated with Banking Account"
                name="stripe_address_line1"
                onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("stripe_address_line1")}
            </FormGroup>
            <div className="form-row">
              <FormGroup validationState={this.getValidationState("stripe_address_city")}>
                <ControlLabel>City</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter City"
                  name="stripe_address_city"
                  onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("stripe_address_city")}
              </FormGroup>
              <FormGroup validationState={this.getValidationState("stripe_address_postal_code")}>
                <ControlLabel>Postal Code</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter Postal Code"
                  name="stripe_address_postal_code"
                  onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("stripe_address_postal_code")}
              </FormGroup>
            </div>
            <div className="form-row">
              <FormGroup validationState={this.getValidationState("stripe_address_state")}>
                <ControlLabel>Address State</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="stripe_address_state"
                  onChange={(event) => this.handleChange(event)}>
                  <option value="" disabled selected>Select your state</option>
                  {this.renderOptions('state')}
                </FormControl>
                {this.displayErrorMessage("stripe_address_state")}
              </FormGroup>
              <FormGroup validationState={this.getValidationState("stripe_ssn_last_4")}>
                <ControlLabel>Last 4 Digits of SSN</ControlLabel>
                <FormControl
                  componentClass="input"
                  type="password"
                  maxLength="4"
                  placeholder="Enter Last 4 Digits of SSN"
                  name="stripe_ssn_last_4"
                  onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("stripe_ssn_last_4")}
              </FormGroup>
            </div>

            <FormGroup validationState={this.getValidationState("stripe_country")}>
              <ControlLabel>Bank Account Country</ControlLabel>
              <FormControl
                componentClass="select"
                name="stripe_country"
                onChange={(event) => this.handleCountryChange(event)}>
                <option value="" disabled selected>Select Bank Acount Country</option>
                {this.renderOptions('country')}
              </FormControl>
              {this.displayErrorMessage("stripe_country")}
            </FormGroup>
          </div>
      );
    }
  }

  render () {
    let loadingContainer;

    if (this.state.loading) {
      loadingContainer = <div className="loading-container">
        <div className="loading"></div>
      </div>
    }

    return (
      <div className="page-wrapper form-wrapper">
        {loadingContainer}
        <Header />
          <div className="content-wrapper form-page">
            <h1 className="marginBot-lg">Teacher Application</h1>
            <div className="form-container">
              <form>
              {/*Application Page 1*/}
              <h2 className="section-title"
                style={{marginTop: "0px"}}>Basic Information</h2>
              <div className="form-row">
                <FormGroup validationState={this.getValidationState("first_name")}>
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="First Name"
                    name="first_name"
                    onChange={(event) => this.handleChange(event)}/>
                    {this.displayErrorMessage("first_name")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("last_name")}>
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Last Name"
                    name="last_name"
                    onChange={(event) => this.handleChange(event)}/>
                    {this.displayErrorMessage("last_name")}
                </FormGroup>
              </div>
              <FormGroup validationState={this.getValidationState("gender")}>
                <ControlLabel>Gender</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="gender"
                  onChange={(event) => this.handleIntegerChange(event)}>
                  <option value="" disabled selected>Select your gender</option>
                  {this.renderOptions('gender')}
                </FormControl>
                {this.displayErrorMessage("gender")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("birthday")}>
                <ControlLabel>Birthday</ControlLabel>
                <Datetime
                  dateFormat="MM/DD/YYYY"
                  timeFormat={false}
                  inputProps={{placeholder: "MM/DD/YYYY"}}
                  onChange={(moment) => this.handleDatetimeChange(moment, 'birthday')}/>
                {this.displayErrorMessage("birthday")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("school")}>
                <ControlLabel>School Name</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="School"
                  name="school"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("school")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("school_level")}>
                <ControlLabel>Class Level</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="school_level"
                  onChange={(event) => this.handleIntegerChange(event)}>
                  <option value="" disabled selected>Select your class level</option>
                  {this.renderOptions('school_level')}
                </FormControl>
                {this.displayErrorMessage("school_level")}
              </FormGroup>

               <FormGroup validationState={this.getValidationState("email")}>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Email"
                  name="email"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("email")}
              </FormGroup>

              <div className="form-row">
                <FormGroup validationState={this.getValidationState("password")}>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    componentClass="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("password")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("password_confirmation")}>
                  <ControlLabel>Password Confirmation</ControlLabel>
                  <FormControl
                    componentClass="input"
                    type="password"
                    placeholder="Password"
                    name="password_confirmation"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("password_confirmation")}
                </FormGroup>
              </div>

              <FormGroup validationState={this.getValidationState("phone")}>
                <ControlLabel>Phone</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("phone")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("address")}>
                <ControlLabel>Address</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Address"
                  name="address"
                  id="address"
                  onChange={(event) => this.handleAddressChange(event)} />
                {this.displayErrorMessage("address")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("address2")}>
                <ControlLabel>Address Line 2 (optional)</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Address Line 2"
                  name="address2"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("address2")}
              </FormGroup>

              <div className="form-row">
                <FormGroup validationState={this.getValidationState("city")}>
                  <ControlLabel>City</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="City"
                    name="city"
                    id="locality"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("city")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("state")}>
                  <ControlLabel>State</ControlLabel>
                  <FormControl
                    componentClass="select"
                    name="state"
                    id="administrative_area_level_1"
                    onChange={(event) => this.handleIntegerChange(event)}>
                    <option value="" disabled selected>Select your state</option>
                    {this.renderOptions('state')}
                  </FormControl>
                {this.displayErrorMessage("state")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("zipcode")}>
                  <ControlLabel>Zip Code</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Zip Code"
                    name="zipcode"
                    id="postal_code"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("zipcode")}
                </FormGroup>
              </div>
              <FormGroup validationState={this.getValidationState("teach_for_free")}>
                <ControlLabel>Teach for Free</ControlLabel>
                  <Checkbox
                    name="teach_for_free"
                    onChange={(event) => this.handleCheckboxChange(event)}>
                    I am willing to teach lessons to students for free.
                  </Checkbox>
                {this.displayErrorMessage("teach_for_free")}
              </FormGroup>

              {/*Application Page 2*/}
              <h2 className="section-title">Instruments</h2>
              <FormGroup validationState={this.getValidationState("instruments")}>
                <ControlLabel className="marginBot-sm">Which instruments can you teach?</ControlLabel>
                <div className="form-row">
                  {this.renderInstrumentButtons()}
                </div>
                <CSSTransitionGroup
                  transitionName="fade"
                  transitionEnter={true}
                  transitionLeave={true}
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                  {this.renderInstrumentsFields()}
                </CSSTransitionGroup>
                {this.displayErrorMessage("instruments")}
              </FormGroup>
              <h2 className="section-title">Musical Experience</h2>
              <FormGroup validationState={this.getValidationState("introduction")}>
                <ControlLabel>Tell us a little bit about yourself and the impact
                you hope to make with Forte!</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="introduction"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("introduction")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("teaching_experience")}>
                <ControlLabel>Please describe your teaching experience.</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="teaching_experience"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("teaching_experience")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("training_experience")}>
                <ControlLabel>Please describe your musical training including
                experience receiving music lessons.</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="training_experience"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("training_experience")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("performance_experience")}>
                <ControlLabel>Please describe your experience performing
                with any musical groups or ensembles.</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="performance_experience"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("performance_experience")}
              </FormGroup>

              {/*Application Page 3*/}
              {this.renderPaymentField()}
              <h2 className="section-title">Scheduling</h2>
              <FormGroup validationState={this.getValidationState("location_preference")}>
                <ControlLabel>Location Preference</ControlLabel>
                  <Checkbox
                    name="location_preference"
                    onChange={(event) => this.handleCheckboxChange(event)}>
                    I am willing to host lessons at my home (earn $10/lesson
                      if hosting; $15 if traveling).
                  </Checkbox>
                {this.displayErrorMessage("location_preference")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("travel_distance")}>
                <ControlLabel>Distance Willing to Travel</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="travel_distance"
                  onChange={(event) => this.handleIntegerChange(event)}>
                  <option value="" disabled selected>Select distance</option>
                  {this.renderOptions('travel_distance')}
                </FormControl>
                {this.displayErrorMessage("travel_distance")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("availability")}>
                <ControlLabel>Weekly Availability</ControlLabel>
                <p className="form-input-description">Click and drag on the calendar to select times that you're available.</p>
                <Calendar ref="availability"/>
                {this.displayErrorMessage("availability")}
              </FormGroup>

              {/*Application Page 4*/}

              <h2 className="section-title">Eligibility</h2>
              {/*Application Page 5*/}
              <FormGroup validationState={this.getValidationState("background_check")}>
                <ControlLabel>Do you authorize Forte to conduct a
                background and personal reference checks in accordance
                with our safety policy?</ControlLabel>
                <Radio
                  name="background_check"
                  value={true}
                  onChange={(event) => this.handleBooleanChange(event)}>
                  Yes
                </Radio>
                <Radio
                  name="background_check"
                  value={false}
                  onChange={(event) => this.handleBooleanChange(event)}>
                  No
                </Radio>
                {this.displayErrorMessage("background_check")}
              </FormGroup>

              <h3 className="section-subtitle">References</h3>
              <p className="form-input-description">Choose a few references who can tell us more about you.</p>

              <h4 className="reference-group-label marginTop-md">Reference #1</h4>
              <div className="form-row">
                <FormGroup validationState={this.getValidationState("reference1_first_name")}>
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="First Name"
                    name="reference1_first_name"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference1_first_name")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("reference1_last_name")}>
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Last Name"
                    name="reference1_last_name"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference1_last_name")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("reference1_relation")}>
                  <ControlLabel>Relationship</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Relationship"
                    name="reference1_relation"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference1_relation")}
                </FormGroup>
              </div>

              <div className="form-row">
                <FormGroup validationState={this.getValidationState("reference1_email")}>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Email"
                    name="reference1_email"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference1_email")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("reference1_phone")}>
                  <ControlLabel>Phone</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Phone"
                    name="reference1_phone"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference1_phone")}
                </FormGroup>
              </div>

              <h4 className="reference-group-label marginTop-xl">Reference #2</h4>
              <div className="form-row">
                <FormGroup validationState={this.getValidationState("reference2_first_name")}>
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="First Name"
                    name="reference2_first_name"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference2_first_name")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("reference2_last_name")}>
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Last Name"
                    name="reference2_last_name"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference2_last_name")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("reference2_relation")}>
                  <ControlLabel>Relationship</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Relationship"
                    name="reference2_relation"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference2_relation")}
                </FormGroup>
              </div>

              <div className="form-row">
                <FormGroup validationState={this.getValidationState("reference2_email")}>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Email"
                    name="reference2_email"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference2_email")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("reference2_phone")}>
                  <ControlLabel>Phone</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Phone"
                    name="reference2_phone"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference2_phone")}
                </FormGroup>
              </div>

              <FormGroup validationState={this.getValidationState("criminal_charges")}>
                <ControlLabel>Have you ever been convicted or plead
                guilty to a crime (other than minor traffic offenses) or
                are any criminal charges now pending against you?</ControlLabel>
                <Radio
                  name="criminal_charges"
                  value={Boolean("true")}
                  onChange={(event) => this.handleBooleanChange(event)}>
                  Yes
                </Radio>
                <Radio
                  name="criminal_charges"
                  value={Boolean("false")}
                  onChange={(event) => this.handleBooleanChange(event)}>
                  No
                </Radio>
                {this.displayErrorMessage("criminal_charges")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("youth_participation")}>
                <ControlLabel>Have you ever been refused participation in
                any other youth program?</ControlLabel>
                <Radio
                  name="youth_participation"
                  value={Boolean("true")}
                  onChange={(event) => this.handleBooleanChange(event)}>
                  Yes
                </Radio>
                <Radio
                  name="youth_participation"
                  value={Boolean("false")}
                  onChange={(event) => this.handleBooleanChange(event)}>
                  No
                </Radio>
                {this.displayErrorMessage("youth_participation")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("criminal_explanation")}>
                <ControlLabel>If yes to either of the above, please explain.</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="criminal_explanation"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("criminal_explanation")}
              </FormGroup>

              {/*Application Page 6*/}
              <h2 className="section-title">Waiver</h2>
              <p className="form-help-text">Please read the waiver and sign your name below.</p>
              <button className="button button--sm button--outline-orange marginBot-lg"
                onClick={(event) => this.openWaiver(event)}
                type="button"
                >Open Waiver</button>
              {this.renderWaiverModal()}

              <div className="form-row">
                <FormGroup validationState={this.getValidationState("waiver_signature")}>
                  <ControlLabel>Signature</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Full Name"
                    name="waiver_signature"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("waiver_signature")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("waiver_date")}>
                  <ControlLabel>Date</ControlLabel>
                   <Datetime
                    dateFormat="MM/DD/YYYY"
                    timeFormat={false}
                    inputProps={{placeholder: "MM/DD/YYYY"}}
                    onChange={(moment) => this.handleDatetimeChange(moment, 'waiver_date')}/>
                  {this.displayErrorMessage("waiver_date")}
                </FormGroup>
              </div>

              <Button className="button button--solid-orange login-card__button form-submit"
              onClick={() => this.submitForm()}>Submit</Button>
              <FormControl.Feedback />
            </form>
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}

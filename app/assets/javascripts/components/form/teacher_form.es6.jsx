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
      address_apt: null,
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
      stripe_country: null,
      stripe_currency: null,
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
      showWaiverModal: false,
      errors: {}
    }
  }

  componentDidMount() {
    // set up active instruments object
    var activeInstruments = {}
    for (var i = 0; i < INSTRUMENTS.length; i++) {
      activeInstruments[INSTRUMENTS[i]] = false;
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

  openWaiver() {
    this.setState({ showWaiverModal: true });
  }

  closeWaiver() {
    this.setState({ showWaiverModal: false });
  }

  setAvailability() {
    const { calendar } = this.refs.availability.refs
    //TODO: not ideal way to do this.. figure out some other way
    var eventArray = $(calendar).fullCalendar('clientEvents');
    var availabilityArray = []
    for (var i = 0; i < eventArray.length; i++) {
      availabilityArray = availabilityArray.concat(range_to_array(eventArray[i]['start'], eventArray[i]['end']));
    }
    this.setState({ availability: availabilityArray })
  }

  createStripeAccount() {
    const {
      stripe_country,
      stripe_currency,
      stripe_routing_number,
      stripe_account_number,
      stripe_account_holder_name,
      stripe_account_holder_type
    } = this.state;

    Stripe.bankAccount.createToken({
      country: stripe_country,
      currency: stripe_currency,
      routing_number: stripe_routing_number,
      account_number: stripe_account_number,
      account_holder_name: stripe_account_holder_name,
      account_holder_type: stripe_account_holder_type
    }, this.stripeResponseHandler.bind(this));
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
    const resolve = ((response) => { window.location.href = "/" });

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
    var reject = (response) => {
      this.setState({ errors: response.errors });
    }
    var resolve = (response) => {
      this.verifyStripeAccount(response);
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
        address_apt: this.state.address_apt,
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
        account_id: accountResponse.account.id,
        bank_id: accountResponse.bank_account.id,
      }
    };
    Requester.post(
      ApiConstants.authentication.signup.teacher,
      params,
      resolve,
      reject
    );
  }

  async submitForm() {
    await this.setAvailability();
    await this.createStripeAccount()
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
      case 'currency':
        for (var i = 0; i < CURRENCIES.length; i++) {
          retOptions.push(<option value={CURRENCIES[i]}>{CURRENCIES[i]}</option>);
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
        <div>{instrument}</div>
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
    const { showWaiverModal } = this.state;
    if (showWaiverModal == true) {
      return (
        <WaiverModal handleClose={() => this.closeWaiver()} />
      );
    }
  }

  render () {
    return (
      <div className="page-wrapper">
        <Header />
          <div className="content-wrapper form-page">
            <h1>Teacher Application</h1>
            <div className="form-container">
              <form>
              {/*Application Page 1*/}
              <div className="section-title">
                <h2>Basic Information</h2>
              </div>
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
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("address")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("address_apt")}>
                <ControlLabel>Apt # (optional)</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Apt #"
                  name="address_apt"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("address_apt")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("city")}>
                <ControlLabel>City</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="City"
                  name="city"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("city")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("state")}>
                <ControlLabel>State</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="state"
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
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("zipcode")}
              </FormGroup>
              {/*Application Page 2*/}
              <div className="section-title">
                <h2>Pick the instruments you would like to teach with Forte
                </h2>
              </div>
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
              <div className="section-title">
                <h2>Musical Experience
                </h2>
              </div>
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
             
              <div className="section-title">
                <h2>Scheduling
                </h2>
              </div>
              <FormGroup validationState={this.getValidationState("location_preference")}>
                <ControlLabel>Location Preference</ControlLabel>
                  <Checkbox
                    name="location_preference"
                    onChange={(event) => this.handleBooleanChange(event)}>
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
                <Calendar ref="availability"/>
                {this.displayErrorMessage("availability")}
              </FormGroup>

              {/*Application Page 4*/}
              <div className="section-title">
                <h2>Payment
                </h2>
              </div>
              <div className="form-row">
                <FormGroup>
                  <ControlLabel>Bank Account Holder Name</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Enter Bank Account Holder Name"
                    name="stripe_account_holder_name"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
                <FormGroup validationState={this.getValidationState("birthday")}>
                  <ControlLabel>Bank Account Holder DOB</ControlLabel>
                  <Datetime
                    dateFormat="MM/DD/YYYY"
                    timeFormat={false}
                    inputProps={{placeholder: "MM/DD/YYYY"}}
                    onChange={(moment) => this.handleDatetimeChange(moment, 'stripe_account_holder_dob')}/>
                  {this.displayErrorMessage("birthday")}
                </FormGroup>
              </div>
              <FormGroup>
                <ControlLabel>Bank Account Holder Type</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="stripe_account_holder_type"
                  onChange={(event) => this.handleChange(event)}>
                  <option value="" disabled selected>Select Account Type</option>
                  {this.renderOptions('account_holder_type')}
                </FormControl>
              </FormGroup>
              <div className="form-row">
                <FormGroup>
                  <ControlLabel>Routing Number</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Enter Routing Number"
                    name="stripe_routing_number"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Bank Account Number</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Enter Bank Account Number"
                    name="stripe_account_number"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
              </div>
              <FormGroup>
                <ControlLabel>Address</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter Address Associated with Banking Account"
                  name="stripe_address_line1"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>
              <div className="form-row">
                <FormGroup>
                  <ControlLabel>City</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Enter City"
                    name="stripe_address_city"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Postal Code</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Enter Postal Code"
                    name="stripe_address_postal_code"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
              </div>
              <div className="form-row">
                <FormGroup>
                  <ControlLabel>Address State</ControlLabel>
                  <FormControl
                    componentClass="select"
                    name="stripe_address_state"
                    onChange={(event) => this.handleChange(event)}>
                    <option value="" disabled selected>Select your state</option>
                    {this.renderOptions('state')}
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Last 4 Digits of SSN</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Enter Last 4 Digits of SSN"
                    name="stripe_ssn_last_4"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
              </div>

              <div className="form-row">
                <FormGroup>
                  <ControlLabel>Bank Account Country</ControlLabel>
                  <FormControl
                    componentClass="select"
                    name="stripe_country"
                    onChange={(event) => this.handleCountryChange(event)}>
                    <option value="" disabled selected>Select Bank Acount Country</option>
                    {this.renderOptions('country')}
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Currency</ControlLabel>
                  <FormControl
                    componentClass="select"
                    name="stripe_currency"
                    onChange={(event) => this.handleChange(event)}>
                    <option value="" disabled selected>Select Currency</option>
                    {this.renderOptions('currency')}
                  </FormControl>
                </FormGroup>
              </div>

              <div className="section-title">
                <h2>Eligibility
                </h2>
              </div>
              {/*Application Page 5*/}
              <FormGroup validationState={this.getValidationState("background_check")}>
                <ControlLabel>Do you authorize Forte to conduct a
                background and personal reference checks in accordance
                with our saftey policy?</ControlLabel>
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

              <div className="form-row">
                <FormGroup validationState={this.getValidationState("reference1_first_name")}>
                  <ControlLabel>Reference #1</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="First Name"
                    name="reference1_first_name"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference1_first_name")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("reference1_last_name")}>
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Last Name"
                    name="reference1_last_name"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference1_last_name")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("reference1_relation")}>
                  <ControlLabel></ControlLabel>
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
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Email"
                    name="reference1_email"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference1_email")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("reference1_phone")}>
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Phone"
                    name="reference1_phone"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference1_phone")}
                </FormGroup>
              </div>

              <div className="form-row">
                <FormGroup validationState={this.getValidationState("reference2_first_name")}>
                  <ControlLabel>Reference #2</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="First Name"
                    name="reference2_first_name"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference2_first_name")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("reference2_last_name")}>
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Last Name"
                    name="reference2_last_name"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference2_last_name")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("reference2_relation")}>
                  <ControlLabel></ControlLabel>
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
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Email"
                    name="reference2_email"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference2_email")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("reference2_phone")}>
                  <ControlLabel></ControlLabel>
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
                guilty to a crime (other than minor traffic offences) or
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
              <div className="section-title">
                <h2>Waiver
                </h2>
              </div>
              <a onClick={(event) => this.openWaiver(event)}>Please read the Waiver and sign below</a>
              {this.renderWaiverModal()}
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

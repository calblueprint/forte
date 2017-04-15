class TeacherForm extends BaseUserComponent {
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
      stripe_address: null,
      stripe_address2: null,
      stripe_city: null,
      stripe_state: null,
      stripe_zipcode: null,
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

  /* Back-end Validtions for Teacher Fields */
  validateTeacherFields() {
    var reject = (response) => { this.validateAddress(response) };
    var resolve = (response) => { this.validateAddress({}) };

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
        criminal_charges: this.state.criminal_charges,
        youth_participation: this.state.youth_participation,
        criminal_explanation: this.state.criminal_explanation,
        waiver_signature: this.state.waiver_signature,
        waiver_date: this.state.waiver_date,
        instruments_attributes: this.state.instruments_attributes,
      }
    };

    Requester.post(
      ApiConstants.teachers.validate,
      params,
      resolve,
      reject
    );
  }

  async createStripeUser(teacher_errs, address_errors) {
    const {
      stripe_country,
      stripe_routing_number,
      stripe_account_number,
      stripe_account_holder_name,
      stripe_account_holder_type,
      teach_for_free,
    } = this.state;

    if (!teach_for_free) {
      var validate_stripe_response = await this.validateUserAndStripeCustomer(teacher_errs, address_errors);

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
        toastr.error("There are errors with your form! <br> Please correct them before continuing!");
        this.stopLoading();
      }
    } else {
      var instrument_errs = await this.validateInstruments();
      if (!(Object.keys(instrument_errs).length === 0) ||
          !(Object.keys(address_errors).length === 0) ||
          !(Object.keys(teacher_errs).length === 0)) {
        toastr.error("There are errors with your form! <br> Please correct them before continuing!");
        var error_info = Object.assign({}, teacher_errs, address_errors, instrument_errs);
        this.setState({ errors: error_info });
        this.stopLoading();
      } else {
        this.createTeacher();
      }
    }
  }

  stripeResponseHandler(status, response) {
    const reject = (response) => { this.stopLoading() };
    const resolve = ((response) => { this.createTeacher(response) });

    if (response.error) {
      this.stopLoading();
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

  /**
   * Calls Stripe validations on the inputted payment information
   * @param stripe_routing_number
   * @param stripe_account_number
   * @param stripe_country
   */
  stripeValidateFields() {
    const { stripe_routing_number, stripe_account_number, stripe_country } = this.state;

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
    payment_errs.stripe_address = [this.state.stripe_address, "Can't be blank"];
    payment_errs.stripe_city = [this.state.stripe_city, "Can't be blank"];
    payment_errs.stripe_state = [this.state.stripe_state, "Can't be blank"];
    payment_errs.stripe_zipcode = [this.state.stripe_zipcode, "Can't be blank"];
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
      stripe_address,
      stripe_city,
      stripe_zipcode,
      stripe_state,
      stripe_ssn_last_4,
    } = this.state
    const reject = (response) => { this.stopLoading() };
    const resolve = ((response) => {
      this.stopLoading();
      window.location = RouteConstants.teacher.lessons;
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
      address_city: stripe_city,
      address_line_1: stripe_address,
      address_postal_code: stripe_zipcode,
      address_state: stripe_state,
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
        window.location = RouteConstants.teacher.lessons;
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
    const { criminal_charges } = this.state;

    if (criminal_charges) {
      this.openRejectionModal();
    } else {
      await this.setAvailability();
      await this.setInstruments();
      await this.validateTeacherFields();
    }
  }

  openRejectionModal() {
    this.setState({ showRejectionModal: true });
  }

  closeRejectionModal() {
    window.location = '/';
  }

  renderRejectionModal() {
    const { showRejectionModal } = this.state;
    if (showRejectionModal) {
      return(
        <RejectionModal handleClose={() => this.closeRejectionModal()} />
      );
    }
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
              <FormatInput
                formName             = "Bank Account Holder DOB"
                inputId              = "stripe_account_holder_dob"
                handleChange = { (moment) => this.handleDatetimeChange(moment, "stripe_account_holder_dob") }
                validationState      = { (name) => this.getValidationState(name) }
                displayErrors        = { (name) => this.displayErrorMessage(name) } />
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

            <AddressForm
              getValidationState={this.getValidationState.bind(this)}
              displayErrorMessage={this.displayErrorMessage.bind(this)}
              renderOptions={this.renderOptions.bind(this)}
              handleIntegerChange={this.handleIntegerChange.bind(this)}
              setState={this.setState.bind(this)}
              handleChange={this.handleChange.bind(this)}
              is_stripe_address={true} />

            <div className="form-row">
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
                <option value="" disabled selected>Select Bank Account Country</option>
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

              <FormatInput
                formName             = "Birthday"
                inputId              = "birthday"
                handleChange = { (moment) => this.handleDatetimeChange(moment, "birthday") }
                validationState      = { (name) => this.getValidationState(name) }
                displayErrors        = { (name) => this.displayErrorMessage(name) } />

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
                  {this.renderOptions('teacher_school_level')}
                </FormControl>
                {this.displayErrorMessage("school_level")}
              </FormGroup>

               <FormGroup validationState={this.getValidationState("email")}>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="example@example.com"
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

              <FormatInput
                formName        = "Phone"
                inputId         = "phone"
                handleChange    = { (event) => this.handleChange(event) }
                validationState = { (name) => this.getValidationState(name) }
                displayErrors   = { (name) => this.displayErrorMessage(name) } />

              <AddressForm
                getValidationState={this.getValidationState.bind(this)}
                displayErrorMessage={this.displayErrorMessage.bind(this)}
                renderOptions={this.renderOptions.bind(this)}
                handleIntegerChange={this.handleIntegerChange.bind(this)}
                setState={this.setState.bind(this)}
                handleChange={this.handleChange.bind(this)}
                is_stripe_address={false} />

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
                  placeholder="I am a third-year Economics student at UC Berkeley,
                  sushi enthusiast and devoted Golden State Warriors fan. I learned
                  the clarinet in middle school and have loved performing, practicing
                  and teaching ever since. I hope to teach aspiring cellists fundamentals
                  in scales, intotation and vibrato."
                  name="introduction"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("introduction")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("teaching_experience")}>
                <ControlLabel>Please describe your teaching experience.</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="I have taught clarinet to middle school students for two
                  years and have not taught piano prior to joining Forte."
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
                  placeholder="I hope to teach aspiring clarinet players fundamentals
                  including scales and intonation."
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
                  placeholder="I have played clarinet in my high school band and local
                  community wind ensemble."
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

              <h3 className="section-subtitle">Reference</h3>
              <p className="form-input-description">Choose a reference who can tell us more about you.</p>

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
                    placeholder="example@example.com"
                    name="reference1_email"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("reference1_email")}
                </FormGroup>

                <FormatInput
                  formName        = "Phone"
                  inputId         = "reference1_phone"
                  handleChange    = { (event) => this.handleChange(event) }
                  validationState = { (name) => this.getValidationState(name) }
                  displayErrors   = { (name) => this.displayErrorMessage(name) } />

              </div>

              <FormGroup validationState={this.getValidationState("criminal_charges")}>
                <ControlLabel>Have you ever been convicted or plead
                guilty to a crime (other than minor traffic offenses) or
                are any criminal charges now pending against you?</ControlLabel>
                <Radio
                  name="criminal_charges"
                  value={true}
                  onChange={(event) => this.handleBooleanChange(event)}>
                  Yes
                </Radio>
                <Radio
                  name="criminal_charges"
                  value={false}
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
                  value={true}
                  onChange={(event) => this.handleBooleanChange(event)}>
                  Yes
                </Radio>
                <Radio
                  name="youth_participation"
                  value={false}
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
              {this.renderRejectionModal()}

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

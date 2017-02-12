class StudentForm extends React.Component {
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
      guardian_first_name: null,
      guardian_last_name: null,
      guardian_phone: null,
      introduction: null,
      lesson_experience: null,
      performance_experience: null,
      student_email: null,
      student_phone: null,
      address: null,
      address_apt: null,
      state: null,
      zipcode: null,
      location_preference: false,
      travel_distance: null,
      availability: null,
      income_range: null,
      household_number: null,
      disciplinary_action: null,
      criminal_charges: null,
      criminal_explanation: null,
      waiver_signature: null,
      waiver_date: null,
      card_number: null,
      cvc: null,
      exp_month: null,
      exp_year: null,
      cardholder_name: null,
      stripe_address_line1: null,
      stripe_address_line2: null,
      stripe_address_city: null,
      stripe_address_state: null,
      stripe_address_zip: null,
      activeInstruments: {},
      instruments: {},
      instruments_attributes: [],
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
        is_primary: false,
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
    console.log(moment);
    if (name == 'birthday') {
      this.setState({ birthday: moment });
    } else if (name == 'waiver_date') {
      this.setState({ waiver_date: moment });
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
    this.setState({ availability: availabilityArray });
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

/**
 * Sets the state of errors to be the errored fields returned from stripeValidateFields
 * @param card_number
 * @param exp_month, exp_year
 * @param cvc
 */
async validateStripeCustomer(card_number, exp_month, exp_year, cvc) {
    var dict = await this.stripeValidateFields(card_number, exp_month, exp_year, cvc);
    var x = {};
    for (var k in dict) {
      //TODO: javascript fxn can check if there are any false values and return error on UI
      if (dict[k][0] === false) {
        x[k] = dict[k][1];
      }
    }
    this.setState({ errors: x });
  }

  /**
   * Calls Stripe validations on the inputted card information
   * @param card_number
   * @param exp_month, exp_year
   * @param cvc
   *
   */
  async stripeValidateFields(card_number, exp_month, exp_year, cvc) {
    var num_err = Stripe.card.validateCardNumber(card_number);
    var expiry_err = Stripe.card.validateExpiry(exp_month, exp_year);
    var cvc_err = Stripe.card.validateCVC(cvc);
    var card_errs = {};
    card_errs.card_number = [num_err, "Please enter a valid card number"];
    card_errs.exp_month = [expiry_err, "Please enter a valid card expiration date"];
    card_errs.cvc = [cvc_err, "Please enter a valid cvc number"];
    return card_errs;
  }

  async createStripeCustomer() {
    const {
      card_number,
      cvc,
      exp_month,
      exp_year,
      cardholder_name,
      stripe_address_line1,
      stripe_address_line2,
      stripe_address_city,
      stripe_address_state,
      stripe_address_zip,
      errors,
    } = this.state;

    await this.validateStripeCustomer(card_number, exp_month, exp_year, cvc); // Validate stripe credentials first

    // Only create customer if stripe validations pass - check that this doesnt happen if there are errors
    var st = this.state.errors
    if (st.card_number === undefined && st.exp_month === undefined && st.cvc === undefined) {
      Stripe.card.createToken({
        number: card_number,
        cvc: cvc,
        exp_month: exp_month,
        exp_year: exp_year,
        name: cardholder_name,
        address_line1: stripe_address_line1,
        address_line2: stripe_address_line2,
        address_city: stripe_address_city,
        address_state: stripe_address_state,
        address_zip: stripe_address_zip
      }, this.stripeResponseHandler.bind(this), console.log("createtoken"));
    }
  }

  stripeResponseHandler(status, response) {
    const reject = (response) => { console.log(response) };
    const resolve = ((response) => { this.createStudent(response) });

    if (response.error) {
      console.log(response.error);
    } else {
      var params = {
        stripe_token: response.id,
        email: this.state.email,
      };
      Requester.post(
        ApiConstants.stripe.createCustomer,
        params,
        resolve,
        reject
      );
    }
  }

  createStudent(customer) {
    var reject = (response) => {
      this.setState({ errors: response.errors });
      console.log(response);
    };
    var resolve = (response) => { window.location = "/" };
    var params = {
      student: {
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
        guardian_first_name: this.state.guardian_first_name,
        guardian_last_name: this.state.guardian_last_name,
        guardian_phone: this.state.guardian_phone,
        introduction: this.state.introduction,
        lesson_experience: this.state.lesson_experience,
        performance_experience: this.state.performance_experience,
        student_email: this.state.student_email,
        student_phone: this.state.student_phone,
        address: this.state.address,
        address_apt: this.state.address_apt,
        state: this.state.state,
        zipcode: this.state.zipcode,
        location_preference: this.state.location_preference,
        travel_distance: this.state.travel_distance,
        availability: this.state.availability,
        income_range: this.state.income_range,
        household_number: this.state.household_number,
        disciplinary_action: this.state.disciplinary_action,
        criminal_charges: this.state.criminal_charges,
        criminal_explanation: this.state.criminal_explanation,
        waiver_signature: this.state.waiver_signature,
        waiver_date: this.state.waiver_date,
        customer_id: customer.id,
        instruments_attributes: this.state.instruments_attributes,
      },
    };
    Requester.post(
      ApiConstants.authentication.signup.student,
      params,
      resolve,
      reject
    );
  }

  // createStudent is called after stripeResponseHandler resolves.
  async submitForm() {
    await this.setAvailability();
    await this.setInstruments();
    await this.createStripeCustomer();
  }

  renderOptions(type) {
    var optionsArray = []
    var retOptions = []
    switch(type) {
      case 'gender':
        optionsArray = GENDERS;
        break;
      case 'school_level':
        optionsArray = STUDENT_SCHOOL_LEVELS;
        break;
      case 'state':
        optionsArray = STATES;
        break;
      case 'travel_distance':
        optionsArray = TRAVEL_DISTANCES;
        break;
      case 'income_range':
        optionsArray = INCOME_RANGES;
        break;
      case 'proficiency':
        optionsArray = PROFICIENCY;
        break;
      case 'years_played':
        optionsArray = YEARS_PLAYED;
        break;
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
    const { showWaiverModal } = this.state;
    if (showWaiverModal == true) {
      return (
        <WaiverModal handleClose={() => this.closeWaiver()} />
      );
    }
  }

  render () {
    return (
      <div className="page-wrapper form-wrapper">
        <Header />
          <div className="content-wrapper form-page">
            <h1>Student Application</h1>
            <div className="form-container">
              <form>
              {/*Application Page 1*/}
              <div className="section-title">
                <h2>Student Information</h2>
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
              <FormGroup validationState={this.getValidationState("student_email")}>
                <ControlLabel>Student Email (optional)</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter Email"
                  name="student_email"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("student_email")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("student_phone")}>
                <ControlLabel>Student Phone (optional)</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter Phone Number"
                  name="student_phone"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("student_phone")}
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


             <div className="section-title">
                <h2>Parent/Guardian Information</h2>
              </div>
              <div className="form-row">
                <FormGroup validationState={this.getValidationState("guardian_first_name")}>
                  <ControlLabel>Parent/Guardian First Name</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Enter first name"
                    name="guardian_first_name"
                    onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("guardian_first_name")}
                </FormGroup>

                <FormGroup validationState={this.getValidationState("guardian_last_name")}>
                  <ControlLabel>Parent/Guardian Last Name</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Enter last name"
                    name="guardian_last_name"
                    onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("guardian_last_name")}
                </FormGroup>
              </div>

              <FormGroup validationState={this.getValidationState("guardian_phone")}>
                <ControlLabel>Parent/Guardian Phone</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter phone number"
                  name="guardian_phone"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("guardian_phone")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("email")}>
                <ControlLabel>Parent/Guardian Email</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Email Address"
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

              <div className="section-title">
                <h2>Pick the instruments you would like to learn with Forte
                </h2>
              </div>
              {/*Application Page 2*/}
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
                <ControlLabel>Let us know a little bit about yourself!</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="introduction"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("introduction")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("lesson_experience")}>
                <ControlLabel>What kind of experience do you have learning music?</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="lesson_experience"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("lesson_experience")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("performance_experience")}>
                <ControlLabel>What kind of experience do you have performing?</ControlLabel>
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
                <h2>Scheduling</h2>
              </div>
              <FormGroup validationState={this.getValidationState("location_preference")}>
                <ControlLabel>Location Preference</ControlLabel>
                  <Checkbox
                    name="location_preference"
                    onChange={(event) => this.handleBooleanChange(event)}>
                    I am willing to host lessons at my home ($20/lesson).
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
                <h2>Payment</h2>
              </div>
              <FormGroup validationState={this.getValidationState("cardholder_name")}>
                <ControlLabel>Cardholder Name</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter Cardholder Name"
                  name="cardholder_name"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("cardholder_name")}
              </FormGroup>
              <FormGroup validationState={this.getValidationState("card_number")}>
                <ControlLabel>Card Number</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter Card Number"
                  name="card_number"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("card_number")}
              </FormGroup>
              <div className="form-row">
                <FormGroup validationState={this.getValidationState("exp_month")}>
                  <ControlLabel>Expiration Date</ControlLabel>
                  <div className="form-row form-row-input">
                    <FormControl
                    componentClass="input"
                    placeholder="MM"
                    name="exp_month"
                    onChange={(event) => this.handleIntegerChange(event)}/>
                  <FormControl
                    componentClass="input"
                    placeholder="YYYY"
                    name="exp_year"
                    onChange={(event) => this.handleIntegerChange(event)}/>
                  </div>
                  {this.displayErrorMessage("exp_month")}
                </FormGroup>
                <FormGroup validationState={this.getValidationState("cvc")}>
                  <ControlLabel>CVC</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Enter CVC Code"
                    name="cvc"
                    onChange={(event) => this.handleChange(event)}/>
                    {this.displayErrorMessage("cvc")}
                </FormGroup>
              </div>
              <FormGroup validationState={this.getValidationState("stripe_address_line1")}>
                <ControlLabel>Billing Address Line 1</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter Billing Address Line 1"
                  name="stripe_address_line1"
                  onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("stripe_address_line1")}
              </FormGroup>
              <div className="form-row">
                <FormGroup validationState={this.getValidationState("stripe_address_line2")}>
                  <ControlLabel>Billing Address Line 2 (optional)</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Enter Billing Address Line 2"
                    name="stripe_address_line2"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("stripe_address_line2")}
                </FormGroup>
                <FormGroup validationState={this.getValidationState("stripe_address_zip")}>
                  <ControlLabel>Billing Zip Code</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Enter Billing Zip Code"
                    name="stripe_address_zip"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("stripe_address_zip")}
                </FormGroup>
              </div>
              <div className="form-row">
                <FormGroup validationState={this.getValidationState("stripe_address_city")}>
                  <ControlLabel>Billing Address City</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Enter Billing Address City"
                    name="stripe_address_city"
                    onChange={(event) => this.handleChange(event)}/>
                  {this.displayErrorMessage("stripe_address_city")}
                </FormGroup>
                <FormGroup validationState={this.getValidationState("stripe_address_state")}>
                  <ControlLabel>Billing Address State</ControlLabel>
                  <FormControl
                    componentClass="select"
                    name="stripe_address_state"
                    onChange={(event) => this.handleChange(event)}>
                    <option value="" disabled selected>Select your state</option>
                    {this.renderOptions('state')}
                  </FormControl>
                  {this.displayErrorMessage("stripe_address_state")}
                </FormGroup>
              </div>

              {/*Application Page 5*/}
              <div className="section-title">
                <h2>Eligibility</h2>
              </div>
              <FormGroup validationState={this.getValidationState("income_range")}>
                <ControlLabel>Income Estimate</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="income_range"
                  onChange={(event) => this.handleIntegerChange(event)}>
                  <option value="" disabled selected>Enter income range</option>
                  {this.renderOptions('income_range')}
                </FormControl>
                {this.displayErrorMessage("income_range")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("household_number")}>
                <ControlLabel>Household Number</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Number of members in household"
                  name="household_number"
                  onChange={(event) => this.handleIntegerChange(event)}/>
                {this.displayErrorMessage("household_number")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("disciplinary_action")}>
                <ControlLabel>Has your student ever been subject to
                disciplinary action?</ControlLabel>
                <Radio
                  name="disciplinary_action"
                  value={true}
                  onChange={(event) => this.handleBooleanChange(event)}>
                  Yes
                </Radio>
                <Radio
                  name="disciplinary_action"
                  value={false}
                  onChange={(event) => this.handleBooleanChange(event)}>
                  No
                </Radio>
                {this.displayErrorMessage("disciplinary_action")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("criminal_charges")}>
                <ControlLabel>Has your student ever been convicted or plead
                guilty to a crime (other than minor traffic offences)?</ControlLabel>
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

              <FormGroup validationState={this.getValidationState("criminal_explanation")}>
                <ControlLabel>Explanation of Criminal Charges If Any</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="criminal_explanation"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("criminal_explanation")}
              </FormGroup>
              <div className="section-title">
                <h2>Waiver</h2>
              </div>
              {/*Application Page 6*/}
              <a onClick={(event) => this.openWaiver(event)}>Please read the Waiver and sign below</a>
              {this.renderWaiverModal()}
              <FormGroup validationState={this.getValidationState("waiver_signature")}>
                <ControlLabel>Signature</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Enter name"
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

              <Button
                className="button button--solid-orange login-card__button form-submit"
                onClick={() => this.submitForm()}>
                  Submit
              </Button>
              <FormControl.Feedback />
            </form>
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}

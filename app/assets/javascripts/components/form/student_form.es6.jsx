class StudentForm extends BaseUserComponent {
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
      address2: null,
      state: null,
      zipcode: null,
      location_preference: false,
      travel_distance: null,
      availability: null,
      income_range: null,
      household_number: null,
      disciplinary_action: null,
      criminal_charges: null,
      waiver_signature: null,
      waiver_date: null,
      card_number: null,
      cvc: null,
      exp_month: null,
      exp_year: null,
      cardholder_name: null,
      stripe_address: null,
      stripe_address2: null,
      stripe_city: null,
      stripe_state: null,
      stripe_zipcode: null,
      activeInstruments: {},
      instruments: {},
      instruments_attributes: [],
      lat: null,
      lng: null,
      showWaiverModal: false,
      errors: {},
      loading: false,
    }
  }

  /**
    * Validates fields for student form fields
    */
  async validateStudentFields() {
    var reject = (response) => { this.validateAddress(response) };
    var resolve = (response) => { this.validateAddress({}) };

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
        waiver_signature: this.state.waiver_signature,
        waiver_date: this.state.waiver_date,
        instruments_attributes: this.state.instruments_attributes,
        lat: this.state.lat,
        lng: this.state.lng,
      },
    }
    Requester.post(
      ApiConstants.students.validate,
      params,
      resolve,
      reject
    );
  }

  /**
    * Creates a Stripe Customer on the Rails side
    * @param student_errs Object
    */
  async createStripeUser(student_errs, address_errors) {
    const {
      card_number,
      cvc,
      exp_month,
      exp_year,
      cardholder_name,
      stripe_address,
      stripe_address2,
      stripe_city,
      stripe_state,
      stripe_zipcode,
    } = this.state;

    var validated_student_and_stripe = await this.validateUserAndStripeCustomer(student_errs, address_errors);

    // Only create customer if stripe validations pass - do not create token if there are stripe errors
    if (validated_student_and_stripe) {
      Stripe.card.createToken({
        number: card_number,
        cvc: cvc,
        exp_month: exp_month,
        exp_year: exp_year,
        name: cardholder_name,
        address_line1: stripe_address,
        address_line2: stripe_address2,
        address_city: stripe_city,
        address_state: stripe_state,
        address_zip: stripe_zipcode
      }, this.stripeResponseHandler.bind(this));
    } else {
      toastr.error("There are errors with your form! <br> Please correct them before continuing!");
      this.stopLoading();
    }
  }

  stripeResponseHandler(status, response) {
    const reject = (response) => { this.stopLoading()};
    const resolve = ((response) => { this.createStudent(response) });

    if (response.error) {
      this.stopLoading();
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

  /**
   * Calls Stripe validations on the inputted card information
   * @param card_number
   * @param exp_month, exp_year
   * @param cvc
   */
  stripeValidateFields() {
    const { card_number, exp_month, exp_year, cvc } = this.state;

    var card_errs = {};

    var num_err = Stripe.card.validateCardNumber(card_number);
    var expiry_err = Stripe.card.validateExpiry(exp_month, exp_year);
    var cvc_err = Stripe.card.validateCVC(cvc);

    card_errs.cardholder_name = [this.state.cardholder_name, "Can't be blank"];
    card_errs.stripe_address = [this.state.stripe_address, "Can't be blank"];
    card_errs.stripe_city = [this.state.stripe_city, "Can't be blank"];
    card_errs.stripe_state = [this.state.stripe_state, "Can't be blank"];
    card_errs.stripe_zipcode = [this.state.stripe_zipcode, "Can't be blank"];
    card_errs.card_number = [num_err, "Please enter a valid card number"];
    card_errs.exp_month = [expiry_err, "Please enter a valid expiration date"];
    card_errs.cvc = [cvc_err, "Please enter a valid cvc number"];
    return card_errs;
  }

  createStudent(customer) {
    var reject = (response) => {
      this.setState({
        errors: response.errors,
        loading: false
      });
      console.log(response);
    };
    var resolve = (response) => {
      this.stopLoading();
      window.location = RouteConstants.student.lessons;
    };
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
        address2: this.state.address2,
        state: this.state.state,
        zipcode: this.state.zipcode,
        location_preference: this.state.location_preference,
        travel_distance: this.state.travel_distance,
        availability: this.state.availability,
        income_range: this.state.income_range,
        household_number: this.state.household_number,
        disciplinary_action: this.state.disciplinary_action,
        criminal_charges: this.state.criminal_charges,
        waiver_signature: this.state.waiver_signature,
        waiver_date: this.state.waiver_date,
        customer_id: customer.id,
        instruments_attributes: this.state.instruments_attributes,
        lat: this.state.lat,
        lng: this.state.lng,
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
    await this.validateStudentFields();
  }

  renderWaiverModal() {
    const { showWaiverModal } = this.state;
    if (showWaiverModal == true) {
      return (
        <WaiverModal isStudent={true} handleClose={() => this.closeWaiver()} />
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
            <h1 className="marginBot-lg">Student Application</h1>
            <div className="form-container">
              <form>
              {/*Application Page 1*/}
              <h2 className="section-title"
                style={{marginTop: "0px"}}>Student Information</h2>
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
                  placeholder="Enter school"
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
                  {this.renderOptions('student_school_level')}
                </FormControl>
                {this.displayErrorMessage("school_level")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("student_email")}>
                <ControlLabel>Student Email (optional)</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="example@example.com"
                  name="student_email"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("student_email")}
              </FormGroup>

              <FormatInput
                formName        = "Student Phone (optional)"
                inputId         = "student_phone"
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

              <h2 className="section-title">Parent/Guardian Information</h2>
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

              <FormatInput
                formName        = "Guardian Phone"
                inputId         = "guardian_phone"
                handleChange    = { (event) => this.handleChange(event) }
                validationState = { (name) => this.getValidationState(name) }
                displayErrors   = { (name) => this.displayErrorMessage(name) } />

              <FormGroup validationState={this.getValidationState("email")}>
                <ControlLabel>Parent/Guardian Email</ControlLabel>
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

              <h2 className="section-title">Instruments</h2>
              {/*Application Page 2*/}
              <FormGroup validationState={this.getValidationState("instruments")}>
                <ControlLabel className="marginBot-sm">Which instruments would you like to learn?</ControlLabel>
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
                <ControlLabel>Let us know a little bit about yourself!</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="I am a seventh grade student at ABC Middle School and I
                  love soccer, skateboarding and playing clarinet. I hope Forte can help
                  prepare me for my jazz ensemble and teach me basic improvisation."
                  name="introduction"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("introduction")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("lesson_experience")}>
                <ControlLabel>What kind of experience do you have learning music?</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="I have taken two years of clarinet lessons and played piano for
                  five years with no formal instruction."
                  name="lesson_experience"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("lesson_experience")}
              </FormGroup>

              <FormGroup validationState={this.getValidationState("performance_experience")}>
                <ControlLabel>What kind of experience do you have performing?</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="I have played clarinet in my middle school band."
                  name="performance_experience"
                  onChange={(event) => this.handleChange(event)}/>
                {this.displayErrorMessage("performance_experience")}
              </FormGroup>

              {/*Application Page 3*/}
              <h2 className="section-title">Scheduling</h2>
              <FormGroup validationState={this.getValidationState("location_preference")}>
                <ControlLabel>Location Preference</ControlLabel>
                  <Checkbox
                    name="location_preference"
                    onChange={(event) => this.handleCheckboxChange(event)}>
                    I am willing to host lessons at my home.
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
                  componentClass="select"
                  name="household_number"
                  onChange={(event) => this.handleIntegerChange(event)}>
                  <option value="" disabled selected>Select number of members in household</option>
                  {this.renderOptions('household_number')}
                </FormControl>
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

              {/*Application Page 5*/}
              <h2 className="section-title">Payment</h2>

              <p className="form-input-description">Please note all payment processing is handled securely by Stripe and
              Forte does not hold any sensitive information. You will only be charged when a lesson has been completed.</p>

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
                    maxLength="2"
                    placeholder="MM"
                    name="exp_month"
                    onChange={(event) => this.handleIntegerChange(event)}/>
                  <FormControl
                    componentClass="input"
                    maxLength="4"
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
                    type="password"
                    maxLength="4"
                    placeholder="Enter CVC Code"
                    name="cvc"
                    onChange={(event) => this.handleChange(event)}/>
                    {this.displayErrorMessage("cvc")}
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
              </div>

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

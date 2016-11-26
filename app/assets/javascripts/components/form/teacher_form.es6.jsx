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
      lesson_experience: null,
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
      activeInstruments: [],
      instruments: {},
      showWaiverModal: false,
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
      this.setState({ birthday: moment.year() + '-' + moment.month() + '-' + moment.date() });
    } else if (name == 'waiver_date') {
      this.setState({ waiver_date: moment.year() + '-' + moment.month() + '-' + moment.date() });
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

  setAvailability(callback) {
    const { calendar } = this.refs.availability.refs
    //TODO: not ideal way to do this.. figure out some other way
    var eventArray = $(calendar).fullCalendar('clientEvents');
    var availabilityArray = []
    for (var i = 0; i < eventArray.length; i++) {
      availabilityArray = availabilityArray.concat(range_to_array(eventArray[i]['start'], eventArray[i]['end']));
    }
    this.setState({ availability: availabilityArray }, callback)
  }

  submitForm() {
    this.setAvailability(this.sendRequest);
  }

  sendRequest() {
    var reject = (response) => console.log(response);
    var resolve = (response) => {
      window.location.href = "/";
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
        lesson_experience: this.state.lesson_experience,
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
      }
    };
    Requester.post(
      ApiConstants.authentication.signup.teacher,
      params,
      resolve,
      reject
    );
  }

  renderOptions(type) {
    var optionsArray = []
    var retOptions = []
    switch(type) {
      case 'gender':
        optionsArray = GENDERS;
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
              <div className="form-row">
                <FormGroup>
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="First Name"
                    name="first_name"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Last Name"
                    name="last_name"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
              </div>
              <FormGroup>
                <ControlLabel>Gender</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="gender"
                  onChange={(event) => this.handleIntegerChange(event)}>
                  <option value="" disabled selected>Select your gender</option>
                  {this.renderOptions('gender')}
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Birthday</ControlLabel>
                <Datetime
                  dateFormat="MM/DD/YYYY"
                  timeFormat={false}
                  inputProps={{placeholder: "MM/DD/YYYY"}}
                  onChange={(moment) => this.handleDatetimeChange(moment, 'birthday')}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>School Name</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="School"
                  name="school"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

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
              <FormGroup>
                <ControlLabel>Tell us a little bit about yourself and the impact
                you hope to make with Forte!</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="introduction"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Please describe your teaching experience.</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="teaching_experience"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Please describe your musical training including
                experience receiving music lessons.</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="training_experience"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Please describe your experience performing
                with any musical groups or ensembles.</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="performance_experience"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              {/*Application Page 3*/}
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Email"
                  name="email"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <div className="form-row">
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    componentClass="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Password Confirmation</ControlLabel>
                  <FormControl
                    componentClass="input"
                    type="password"
                    placeholder="Password"
                    name="password_confirmation"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
              </div>

              <FormGroup>
                <ControlLabel>Phone</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Address</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Address"
                  name="address"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Apt # (optional)</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Apt #"
                  name="address_apt"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>City</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="City"
                  name="city"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>State</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="state"
                  onChange={(event) => this.handleIntegerChange(event)}>
                  <option value="" disabled selected>Select your state</option>
                  {this.renderOptions('state')}
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Zip Code</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Zip Code"
                  name="zipcode"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Location Preference</ControlLabel>
                  <Checkbox
                    name="location_preference"
                    onChange={(event) => this.handleBooleanChange(event)}>
                    I am willing to host lessons at my home (earn $10/lesson
                      if hosting; $15 if traveling).
                  </Checkbox>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Distance Willing to Travel</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="travel_distance"
                  onChange={(event) => this.handleIntegerChange(event)}>
                  <option value="" disabled selected>Select distance</option>
                  {this.renderOptions('travel_distance')}
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Weekly Availability</ControlLabel>
                <Calendar ref="availability"/>
              </FormGroup>

              {/*Application Page 4*/}
              <FormGroup>
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
              </FormGroup>

              <div className="form-row">
                <FormGroup>
                  <ControlLabel>Reference #1</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="First Name"
                    name="reference1_first_name"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Last Name"
                    name="reference1_last_name"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Relationship"
                    name="reference1_relation"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
              </div>

              <div className="form-row">
                <FormGroup>
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Email"
                    name="reference1_email"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Phone"
                    name="reference1_phone"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
              </div>

              <div className="form-row">
                <FormGroup>
                  <ControlLabel>Reference #2</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="First Name"
                    name="reference2_first_name"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Last Name"
                    name="reference2_last_name"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Relationship"
                    name="reference2_relation"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
              </div>

              <div className="form-row">
                <FormGroup>
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Email"
                    name="reference2_email"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel></ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Phone"
                    name="reference2_phone"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
              </div>

              <FormGroup>
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
              </FormGroup>

              <FormGroup>
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
              </FormGroup>

              <FormGroup>
                <ControlLabel>If yes to either of the above, please explain.</ControlLabel>
                <FormControl
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="criminal_explanation"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              {/*Application Page 5*/}
              <a onClick={(event) => this.openWaiver(event)}>Click Here for Waiver</a>
              {this.renderWaiverModal()}
              <FormGroup>
                <ControlLabel>Signature</ControlLabel>
                <FormControl
                  componentClass="input"
                  placeholder="Full Name"
                  name="waiver_signature"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Date</ControlLabel>
                 <Datetime
                  dateFormat="MM/DD/YYYY"
                  timeFormat={false}
                  inputProps={{placeholder: "MM/DD/YYYY"}}
                  onChange={(moment) => this.handleDatetimeChange(moment, 'waiver_date')}/>
              </FormGroup>

              <Button className="button button--solid-orange login-card__button"
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

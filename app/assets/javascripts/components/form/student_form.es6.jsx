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
    }
  }

  handleChange(event) {
    var name = $(event.target).attr("name");
    var value = $(event.target).val();
    this.setState({ [name] : value });
  }

  handleBooleanChange(event) {
    var name = $(event.target).attr("name");
    var value = $(event.target).val();
    value = (value == "true");
    this.setState({ [name] : value });
  }

  handleIntegerChange(event) {
    var name = $(event.target).attr("name");
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
        lesson_experience: this.state.music_lesson_experience,
        performance_experience: this.state.music_performance_experience,
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
      }
    };
    Requester.post(
      RouteConstants.authentication.signup.student,
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
        optionsArray = genders;
        break;
      case 'school_level':
        optionsArray = schoolLevels;
        break;
      case 'state':
        optionsArray = states;
        break;
      case 'travel_distance':
        optionsArray = travelDistances;
        break;
      case 'income_range':
        optionsArray = incomeRanges;
    }
    for (var i = 0; i < optionsArray.length; i++) {
      retOptions.push(<option value={i}>{optionsArray[i]}</option>);
    }
    return retOptions;
  }

  render () {
    return (
      <div className="page-wrapper">
        <Header />
          <div className="content-wrapper form-page">
            <h1>Student Application</h1>
            <div className="form-container">
              <form>
              {/*Application Page 1*/}
              <div className="form-row">
                <FormGroup>
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl 
                    componentClass="input"  
                    placeholder="Enter first name"
                    name="first_name"
                    onChange={(event) => this.handleChange(event)}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl 
                    componentClass="input" 
                    placeholder="Enter last name"
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

              <FormGroup>
                <ControlLabel>Class Level</ControlLabel>
                <FormControl 
                  componentClass="select"
                  name="school_level" 
                  onChange={(event) => this.handleIntegerChange(event)}>
                  <option value="" disabled selected>Select your class level</option>
                  {this.renderOptions('school_level')}
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Parent/Guardian First Name</ControlLabel>
                <FormControl 
                  componentClass="input" 
                  placeholder="Enter first name"
                  name="guardian_first_name"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Parent/Guardian Last Name</ControlLabel>
                <FormControl 
                  componentClass="input" 
                  placeholder="Enter last name"
                  name="guardian_last_name"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Parent/Guardian Phone</ControlLabel>
                <FormControl 
                  componentClass="input" 
                  placeholder="Enter phone number"
                  name="guardian_phone"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Parent/Guardian Email</ControlLabel>
                <FormControl 
                  componentClass="input" 
                  placeholder="Email Address" 
                  name="email"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup> 

              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl 
                  componentClass="input" 
                  placeholder="Password"
                  name="password"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Password Confirmation</ControlLabel>
                <FormControl 
                  componentClass="input" 
                  placeholder="Password"
                  name="password_confirmation"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              {/*Application Page 2*/}
              <FormGroup>
                <ControlLabel>Let us know a little bit about yourself!</ControlLabel>
                <FormControl 
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="introduction"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>What kind of experience do you have learning music?</ControlLabel>
                <FormControl 
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="lesson_experience"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>What kind of experience do you have performing?</ControlLabel>
                <FormControl 
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="performance_experience"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              {/*Application Page 3*/}
              <FormGroup>
                <ControlLabel>Student Email (optional)</ControlLabel>
                <FormControl 
                  componentClass="input" 
                  placeholder="Enter Email"
                  name="student_email"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Student Phone (optional)</ControlLabel>
                <FormControl 
                  componentClass="input" 
                  placeholder="Enter Phone Number"
                  name="student_phone"
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
                    I am willing to host lessons at my home ($20/lesson).
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
                <ControlLabel>Income Estimate</ControlLabel>
                <FormControl 
                  componentClass="select" 
                  name="income_range" 
                  onChange={(event) => this.handleIntegerChange(event)}>
                  <option value="" disabled selected>Enter income range</option>
                  {this.renderOptions('income_range')}
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Household Number</ControlLabel>
                <FormControl 
                  componenClass="input"
                  placeholder="Number of members in household"
                  name="household_number"
                  onChange={(event) => this.handleIntegerChange(event)}/>
              </FormGroup>

              <FormGroup>
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
              </FormGroup>

              <FormGroup>
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
              </FormGroup>

              <FormGroup>
                <ControlLabel>Explanation of Criminal Charges If Any</ControlLabel>
                <FormControl 
                  componentClass="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="criminal_explanation"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              {/*Application Page 5*/}
              <FormGroup>
                <ControlLabel>Signature</ControlLabel>
                <FormControl 
                  componentClass="input" 
                  placeholder="Enter name"
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

class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      password_confirmation: '',
      first_name: '', 
      last_name: '', 
      city: '',
      gender: '',
      school: '',
      school_level: '',
      graduation_year: '',
      guardian_first_name: '',
      guardian_last_name: '',
      guardian_phone: '',
      guardian_email: '',
      introduction: '',
      music_lesson_experience: '',
      music_performance_experience: '',
      student_phone: '',
      address: '',
      address_apt: '',
      state: '',
      zipcode: '',
      location_preference: '',
      travel_distance: '',
      income_range: '',
      household_number: '',
      disciplinary_action: '',
      criminal_charges: '',
      criminal_explanation: '',
      waiver_signature: '',
      waiver_date: '',
    };
  }

  handleChange(event) {
    this.setState({ [$(event.target).attr("name")] : $(event.target).val() });
  }

  submitForm() {
    var reject = (response) => console.log(response);
    var resolve = (response) => {
      window.location.href = "/";
    };
    // $(calendar).clientevents returns all events
    var params = {
      student: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        city: this.state.city,
        gender: this.state.gender,
        school: this.state.school,
        school_level: this.state.school_level,
        graduation_year: this.state.graduation_year,
        guardian_first_name: this.state.guardian_first_name,
        guardian_last_name: this.state.guardian_last_name,
        guardian_phone: this.state.guardian_phone,
        guardian_email: this.state.guardian_email,
        introduction: this.state.introduction,
        music_lesson_experience: this.state.music_lesson_experience,
        music_performance_experience: this.state.music_performance_experience,
        student_phone: this.state.student_phone,
        address: this.state.address,
        address_apt: this.state.address_apt,
        state: this.state.state,
        zipcode: this.state.zipcode,
        location_preference: this.state.location_preference,
        travel_distance: this.state.travel_distance,
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

  render () {
    return (
      <div className="page-wrapper">
        <Header />
          <div className="content-wrapper">
            <h1>Student Application</h1>
            <form>
              {/*Application Page 1*/}
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
                  type="input" 
                  placeholder="Enter last name"
                  name="last_name"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Gender</ControlLabel>
                <FormControl 
                  componentClass="select" 
                  name="gender" 
                  onChange={(event) => this.handleChange(event)}>
                  <option value="" disabled selected>Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Birthday</ControlLabel>
                <Datetime 
                  dateFormat="MM/DD/YYYY"
                  timeFormat={false}
                  inputProps={{placeholder: "MM/DD/YYYY"}}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>School Name</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="School"
                  name="school"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Class Level</ControlLabel>
                <FormControl 
                  componentClass="select"
                  name="school_level" 
                  onChange={(event) => this.handleChange(event)}>
                  <option value="" disabled selected>Select your class level</option>
                  <option value="Level">Kindergartsen</option>
                  <option value="Level">1st Grade</option>
                  <option value="Level">2nd Grade</option>
                  <option value="Level">3rd Grade</option>
                  <option value="Level">4th Grade</option>
                  <option value="Level">5th Grade</option>
                  <option value="Level">6th Grade</option>
                  <option value="Level">7th Grade</option>
                  <option value="Level">8th Grade</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Graduation Year</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="graduation_year" 
                  onChange={(event) => this.handleChange(event)}>
                  <option value="" disabled selected>Select your graduation year</option>
                  <option value="GYear">2016</option>
                  <option value="GYear">2017</option>
                  <option value="GYear">2018</option>
                  <option value="GYear">2019</option>
                  <option value="GYear">2020</option>
                  <option value="GYear">2021</option>
                  <option value="GYear">2022</option>
                  <option value="GYear">2023</option>
                  <option value="GYear">2024</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Parent/Guardian First Name</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Enter first name"
                  name="guardian_first_name"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Parent/Guardian Last Name</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Enter last name"
                  name="guardian_last_name"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Parent/Guardian Phone</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Enter phone number"
                  name="guardian_phone"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Parent/Guardian Email</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Email Address" 
                  name="guardian_email"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup> 

              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Password"
                  name="password"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Password Confirmation</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Password"
                  name="password_confirmation"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              {/*Application Page 2*/}
              <FormGroup>
                <ControlLabel>Let us know a little bit about yourself!</ControlLabel>
                <FormControl 
                  type="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="introduction"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>What kind of experience do you have learning music?</ControlLabel>
                <FormControl 
                  type="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="music_lesson_experience"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>What kind of experience do you have performing?</ControlLabel>
                <FormControl 
                  type="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="music_performance_experience"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              {/*Application Page 3*/}
              <FormGroup>
                <ControlLabel>Student Email (optional)</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Enter Email"
                  name="email"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Student Phone (optional)</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Enter Phone Number"
                  name="student_phone"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Address</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Address"
                  name="address"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Apt # (optional)</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Apt #"
                  name="address_apt"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>City</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="City"
                  name="city"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>State</ControlLabel>
                <FormControl 
                  componentClass="select" 
                  name="state" 
                  onChange={(event) => this.handleChange(event)}>
                  <option value="" disabled selected>Select your state</option>
                  <option value="State">CA</option>
                  <option value="State">NY</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Zip Code</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Zip Code"
                  name="zipcode"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Location Preference</ControlLabel>
                  <Checkbox 
                    name="location_preference" 
                    onChange={(event) => this.handleChange(event)}>
                    I am willing to host lessons at my home ($20/lesson).
                  </Checkbox>
              </FormGroup>

              <Calendar />

              <FormGroup>
                <ControlLabel>Distance Willing to Travel</ControlLabel>
                <FormControl 
                  componentClass="select" 
                  name="travel_distance" 
                  onChange={(event) => this.handleChange(event)}>
                  <option value="" disabled selected>Select distance</option>
                  <option value="Distance">Up to 5 miles</option>
                  <option value="Distance">Up to 10 miles</option>
                  <option value="Distance">Up to 15 miles</option>
                  <option value="Distance">More than 15 miles</option>
                </FormControl>
              </FormGroup>

              {/*Application Page 4*/}
              <FormGroup>
                <ControlLabel>Income Estimate</ControlLabel>
                <FormControl 
                  componentClass="select" 
                  name="income_range" 
                  onChange={(event) => this.handleChange(event)}>
                  <option value="" disabled selected>Enter income range</option>
                  <option value="Income">$0 - $10,000</option>
                  <option value="Income">$10,001 - $20,000</option>
                  <option value="Income">$20,001 - $30,000</option>
                  <option value="Income">$30,001 - $40,000</option>
                  <option value="Income">$40,001 - $50,000</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Household Number</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Number of members in household"
                  name="household_number"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Has your student ever been subject to 
                disciplinary action?</ControlLabel>
                <Radio
                  name="disciplinary_action" 
                  onChange={(event) => this.handleChange(event)}>
                  Yes
                </Radio>
                <Radio
                  name="disciplinary_action" 
                  onChange={(event) => this.handleChange(event)}>
                  No
                </Radio>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Has your student ever been convicted or plead 
                guilty to a crime (other than minor traffic offences)?</ControlLabel>
                <Radio 
                  name="criminal_charges" 
                  onChange={(event) => this.handleChange(event)}>
                  Yes
                </Radio>
                <Radio 
                  name="criminal_charges" 
                  onChange={(event) => this.handleChange(event)}>
                  No
                </Radio>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Explanation of Criminal Charges If Any</ControlLabel>
                <FormControl 
                  type="input"
                  componentClass="textarea"
                  placeholder="Enter text"
                  name="criminal_explanation"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              {/*Application Page 5*/}
              <FormGroup>
                <ControlLabel>Signature</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Enter name"
                  name="waiver_signature"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Date</ControlLabel>
                <FormControl 
                  type="input" 
                  placeholder="Enter date (DD/MM/YYYY)"
                  name="waiver_date"
                  onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

              <Button className="button button--solid-orange login-card__button" 
              onClick={() => this.submitForm()}>Submit</Button> 
              <FormControl.Feedback />
            </form>
          </div>
        <Footer />
      </div>
    );
  }
}

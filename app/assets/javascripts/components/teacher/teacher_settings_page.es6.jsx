class TeacherSettingsPage extends UserSettings {

  static get propTypes() {
    return {
      fetchProfile: React.PropTypes.func.isRequired,
      isAdmin: React.PropTypes.bool.isRequired,
      person: React.PropTypes.object.isRequired,
      id: React.PropTypes.number.isRequired,
    };
  }

  constructor(props) {
    super(props);

    let person = this.props.person || {};
    person.stripe_routing_number = "*****";
    person.stripe_account_number = "*****";
    person.stripe_address = "*****";
    person.stripe_city = "*****";
    person.stripe_state = "*****";
    person.stripe_zipcode = "*****";
    person.stripe_account_holder_dob = "*****";
    person.stripe_account_holder_type = "*****";
    person.stripe_account_holder_name = "*****";
    person.stripe_country = "*****";
    person.stripe_ssn_last_4 = "*****";
    person.availability = [];


    this.state = {
      addModalIsVisible: false,
      removeModalIsVisible: false,
      person: this.props.person,
      id: this.props.id,
      errors: {},
    }
  }

  componentDidMount() {
    this.fetchProfile();
    this.fetchInstruments();
  }

  fetchProfile() {
    let route = ApiConstants.teachers.show(this.props.id);

    const resolve = (response) => {
      this.props.fetchProfile();
      const { person } = this.state;
      Object.assign(person, response.teacher)

      this.setState({ person: person });
    }

    const reject = (response) => console.log(response);
    Requester.get(route, resolve, reject);
  }

  fetchInstruments() {
    const route = ApiConstants.teachers.instruments(this.props.id);
    const resolve = (response) => {
      let person = this.state.person;
      person.instruments = response.instruments;
      this.setState({ person });
    }
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  saveAvailability(inputDate) {
    const { calendar } = this.refs.settingsAvailability.refs
    var eventArray = $(calendar).fullCalendar('clientEvents');

    var availabilityArray = []
    for (var i = 0; i < eventArray.length; i++) {
      availabilityArray = availabilityArray.concat(range_to_array(eventArray[i]['start'], eventArray[i]['end']));
    }
    this.setState({ availability: availabilityArray});

    const route = ApiConstants.teachers.update(this.props.id);
    const params = {availability: availabilityArray};
    const success = (response) => {
      toastr.success("Availability was successfully updated");
    };
    const fail = (response) => {
      toastr.error(response.message);
    };

    Requester.update(
        route,
        params,
        success,
        fail
    );
  }

  renderCalendar(s) {
    var calendar;
    if (s.availability.length !== 0) {
      calendar = (
        <Calendar
            ref="settingsAvailability"
            isEditable={true}
            events={availability_to_events(s.availability)} />
            );
    }
    return calendar;
  }

  render() {
    const { person, isAdmin } = this.props;

    let s = this.state.person;

    let school_level = s.school_level;
    if (school_level === 'high_school') {
      school_level = 'High School';
    } else {
      school_level = 'College';
    }
    let addInstrumentModal;
    if (s.instruments) {
      addInstrumentModal = this.renderAddModal();
    }

    // Render the password and payment fields if not admin
    let passwordSection, paymentSection;

    if (!isAdmin) {
      passwordSection = (
        <EditableInputGroup title="Change Your Password"
                            handleChange={this.handleChange.bind(this)}
                            attemptSave={this.updateTeacherPassword.bind(this)}
                            fetchProfile={this.fetchProfile.bind(this)}
                            personId={this.props.id}>
          <EditableInput label="New Password" name="password" data={s.password} />
          <EditableInput label="New Password Confirmation" name="password_confirmation" data={s.password_confirmation} />
        </EditableInputGroup>
      )

      paymentSection = (
        <div>
          <h5 className="profile-edit-note">Note: You will need to fill out all the fields</h5>
          <EditableInputGroup title="Payment"
                                handleChange={this.handleChange.bind(this)}
                                attemptSave={this.attemptStripeAccountSave.bind(this)}
                                fetchProfile={this.fetchProfile.bind(this)}>
              <EditableInput label="Bank Account Holder Name" name="stripe_account_holder_name" data={s.stripe_account_holder_name} error={this.state.errors}
                specialHandler={this.handleBirthdayChange.bind(this)} />
              <EditableInput label="Bank Account Holder DOB" name="stripe_account_holder_dob" data={s.stripe_account_holder_dob} error={this.state.errors} />
              <EditableInput label="Bank Account Holder Type" name="stripe_account_holder_type" data={s.stripe_account_holder_type} specialHandler={this.handleChange.bind(this)} error={this.state.errors} />
              <EditableInput label="Routing Number" name="stripe_routing_number" data={s.stripe_routing_number} error={this.state.errors} />
              <EditableInput label="Bank Account Number" name="stripe_account_number" data={s.stripe_account_number} error={this.state.errors} />
              <EditableInput
                label="Billing Address"
                name="address"
                getValidationState={this.getValidationState.bind(this)}
                displayErrorMessage={this.displayErrorMessage.bind(this)}
                renderOptions={this.renderOptions.bind(this)}
                handleIntegerChange={this.handleIntegerChange.bind(this)}
                setState={this.setState.bind(this)}
                handleChange={this.handleChange.bind(this)}
                is_stripe_address={true}
                data={s.stripe_address}
                error={this.state.errors} />
              <EditableInput label="Country" name="stripe_country" specialHandler={this.handleCountryChange.bind(this)} data={s.stripe_country} error={this.state.errors} />
              <EditableInput label="Last 4 Digits SSN" name="stripe_ssn_last_4" data={s.stripe_ssn_last_4} error={this.state.errors} />
            </EditableInputGroup>
        </div>
      )
    }

    return (
      <div>
        <h2 className="settings-title">Your Profile</h2>
        <EditableInputGroup title="Teacher Information"
                            handleChange={this.handleChange.bind(this)}
                            attemptSave={this.attemptTeacherSave.bind(this)}
                            fetchProfile={this.fetchProfile.bind(this)}>

        <EditableInput label="First Name" name="first_name" data={s.first_name} />
        <EditableInput label="Last Name" name="last_name" data={s.last_name} />
        <EditableInput label="Gender" name="gender" data={s.gender}
          specialHandler={this.handleIntegerChange.bind(this)} />
        <EditableInput label="Birthday" name="birthday" data={moment(s.birthday).format("MM/DD/YYYY")}
          specialHandler={this.handleBirthdayChange.bind(this)} />
        <EditableInput label="Email" name="email" data={s.email} />
        <EditableInput label="School" name="school" data={s.school} />
        <EditableInput label="Class Level" name="teacher_school_level" data={school_level}
          specialHandler={this.handleIntegerChange.bind(this)} />
        <EditableInput label="Teacher Phone Number" name="phone" data={s.phone} />
      </EditableInputGroup>

      <EditableInputGroup title="Teacher Address"
                          handleChange={this.handleChange.bind(this)}
                          attemptSave={this.attemptAddressSave.bind(this)}
                          fetchProfile={this.fetchProfile.bind(this)} >
        <EditableInput
          label="Address"
          name="address"
          getValidationState={this.getValidationState.bind(this)}
          displayErrorMessage={this.displayErrorMessage.bind(this)}
          renderOptions={this.renderOptions.bind(this)}
          handleIntegerChange={this.handleIntegerChange.bind(this)}
          setState={this.setState.bind(this)}
          handleChange={this.handleChange.bind(this)}
          is_stripe_address={false}
          data={s.full_address}
          error={this.state.errors} />
        <EditableInput label="Distance Willing to Travel" name="travel_distance"
          data={s.travel_distance} specialHandler={this.handleIntegerChange.bind(this)} />
      </EditableInputGroup>

      { passwordSection }

      <h2 className="section-title">Musical Experience</h2>
      { this.renderInstruments() }
      <Button className="button button--outline-orange button--sm marginTop-md"
        onClick={() => this.openAddModal()}>
        Add Another Instrument
      </Button>
      { addInstrumentModal }

      <h2 className="section-title">Scheduling</h2>
      <p className="form-input-description">Click and drag on the calendar to edit times that you're available.</p>
      { this.renderCalendar(s) }
      <Button
        className="button button--outline-orange button--sm availability-save-btn"
        onClick={() => this.saveAvailability(s.availability)}>
        Save
      </Button>

      { paymentSection }

      <EditableInputGroup title="Eligibility"
                          handleChange={this.handleChange.bind(this)}
                          attemptSave={this.attemptTeacherSave.bind(this)}
                          fetchProfile={this.fetchProfile.bind(this)}>
        <EditableInput label="Reference 1 First Name" name="reference1_first_name" data={s.reference1_first_name} />
        <EditableInput label="Reference 1 Last Name" name="reference1_last_name" data={s.reference1_last_name} />
        <EditableInput label="Reference 1 Relationship" name="reference1_relation" data={s.reference1_relation} />
        <EditableInput label="Reference 1 Email" name="reference1_email" data={s.reference1_email} />
        <EditableInput label="Reference 1 Phone" name="reference1_phone" data={s.reference1_phone} />
      </EditableInputGroup>
    </div>
    );
  }
}

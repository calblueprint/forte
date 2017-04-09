class TeacherSettingsPage extends UserSettings {

  static get propTypes() {
    return {
      teacher: React.PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props);

    let person = this.props.person || {};
    person.availability = [];
    person.stripe_routing_number = "*****";
    person.stripe_account_number = "*****";
    person.stripe_address_line1 = "*****";
    person.stripe_address_city = "*****";
    person.stripe_address_state = "*****";
    person.stripe_address_postal_code = "*****";
    person.stripe_account_holder_dob = "*****";
    person.stripe_account_holder_type = "*****";
    person.stripe_account_holder_name = "*****";
    person.stripe_country = "*****";
    person.stripe_ssn_last_4 = "*****";

    this.state = {
      addModalIsVisible: false,
      removeModalIsVisible: false,
      person: this.props.person,
      id: this.props.id,
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

  openRemoveModal() {
    this.setState({ removeModalIsVisible: true });
  }

  closeRemoveModal() {
    this.setState({ removeModalIsVisible: false });
  }

  openAddModal() {
    this.setState({ addModalIsVisible: true });
  }

  closeAddModal() {
    this.setState({ addModalIsVisible: false });
  }

  renderRemoveModal(instrument) {
    const { removeModalIsVisible } = this.state;

    if (removeModalIsVisible) {
      return (
        <RemoveInstrumentModal
          isVisible={removeModalIsVisible}
          handleClose={() => this.closeRemoveModal()}
          fetchInstruments={() => this.fetchInstruments()}
          instrument={instrument}
        />
      );
    }
  }

  renderAddModal() {
    const { addModalIsVisible } = this.state;
    const { instruments } = this.state.person;
    const { person } = this.props;

    if (addModalIsVisible) {
      return (
        <AddInstrumentModal
          isVisible={addModalIsVisible}
          handleClose={() => this.closeAddModal()}
          fetchInstruments={() => this.fetchInstruments()}
          instruments={instruments}
          instrumentable={person}
        />
      )
    }
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

  renderInstrument(instrument) {
    return (
      <div className="instrument">
        <div className="instrumentName">
          {instrument.name}
        </div>
        <a className="link"
          onClick={() => this.openRemoveModal()}>
          [Remove]
        </a>
        {this.renderRemoveModal(instrument)}
      </div>
    );
  }

  renderInstruments() {
    const { instruments } = this.state.person;
    if (instruments) {
      return instruments.map((instrument) => this.renderInstrument(instrument));
    }
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
      console.log("success");
    };
    const fail = (response) => {
      console.log("fail");
    };

    Requester.update(
        route,
        params,
        success,
        fail
    );
  }

  render() {
    const { person } = this.props;

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
        <EditableInput label="Birthday" name="birthday" data={moment(s.birthday).format("MM/DD/YYYY")} />
        <EditableInput label="Email" name="email" data={s.email} />
        <EditableInput label="School" name="school" data={s.school} />
        <EditableInput label="Class Level" name="teacher_school_level" data={school_level}
          specialHandler={this.handleIntegerChange.bind(this)} />
        <EditableInput label="Teacher Phone Number" name="phone" data={s.phone} />
        <EditableInput label="Address" name="address" data={s.address} />
        <EditableInput label="Apt #" name="address2" data={s.address2} />
        <EditableInput label="City" name="city" data={s.city} />
        <EditableInput label="State" name="state" data={s.state}
          specialHandler={this.handleIntegerChange.bind(this)} />
        <EditableInput label="Zip Code" name="zipcode" data={s.zipcode} />
        <EditableInput label="Distance Willing to Travel" name="travel_distance"
          data={s.travel_distance} specialHandler={this.handleIntegerChange.bind(this)} />
      </EditableInputGroup>

      <h2 className="section-title">Musical Experience</h2>
      {this.renderInstruments()}
      <Button className="button button--outline-orange button--sm marginTop-md"
        onClick={() => this.openAddModal()}>
        Add Another Instrument
      </Button>
      {addInstrumentModal}

      <h2 className="section-title">Scheduling</h2>
      <p className="form-input-description">Click and drag on the calendar to edit times that you're available.</p>
      <Calendar
        ref="settingsAvailability"
        isEditable={true}
        events={availability_to_events(s.availability, s.timezone)} />
      <Button
        className="button button--outline-orange button--sm availability-save-btn"
        onClick={() => this.saveAvailability(s.availability)}>
        Save
      </Button>

      <EditableInputGroup title="Payment"
                            handleChange={this.handleChange.bind(this)}
                            attemptSave={this.attemptStripeAccountSave.bind(this)}
                            fetchProfile={this.fetchProfile.bind(this)}>
          <EditableInput label="Bank Account Holder Name" name="stripe_account_holder_name" data={s.stripe_account_holder_name} />
          <EditableInput label="Bank Account Holder DOB" name="stripe_account_holder_dob" data={s.stripe_account_holder_dob} />
          <EditableInput label="Bank Account Holder Type" name="stripe_account_holder_type" data={s.stripe_account_holder_type} />
          <EditableInput label="Routing Number" name="stripe_routing_number" data={s.stripe_routing_number} />
          <EditableInput label="Bank Account Number" name="stripe_account_number" data={s.stripe_account_number} />
          <EditableInput label="Address" name="stripe_address_line1" data={s.stripe_address_line1} />
          <EditableInput label="City" name="stripe_address_city" data={s.stripe_address_city} />
          <EditableInput label="State" name="stripe_address_state"
            data={s.stripe_address_state}
            specialHandler={this.handleIntegerChange.bind(this)} />
          <EditableInput label="Country" name="stripe_country" data={s.stripe_country} />
          <EditableInput label="Postal Code" name="stripe_address_postal_code" data={s.stripe_address_postal_code} />
          <EditableInput label="Last 4 Digits SSN" name="stripe_ssn_last_4" data={s.stripe_ssn_last_4} />
        </EditableInputGroup>

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

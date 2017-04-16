class StudentSettingsPage extends UserSettings {

  static get propTypes() {
    return {
      student: React.PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props);

    let person = this.props.person || {};
    person.availability = [];
    person.card_number = "*****";
    person.cvc = "*****";
    person.exp_month = "*****";
    person.exp_year = "*****";
    person.cardholder_name = "*****";
    person.instruments = null;
    person.stripe_address_line1 = "*****";
    person.stripe_address_line2 = "*****";
    person.stripe_address_city = "*****";
    person.stripe_address_state = "*****";
    person.stripe_address_zip = "*****";

    this.state = {
      addModalIsVisible: false,
      removeModalIsVisible: false,
      person: person,
      id: this.props.id,
      errors: this.props.errors,
    }
  }

  componentDidMount() {
    this.fetchProfile();
    this.fetchInstruments();
  }

  fetchProfile() {
    let route = ApiConstants.students.show(this.props.id);

    const resolve = (response) => {
      this.props.fetchProfile();
      const { person } = this.state;
      Object.assign(person, response.student)

      this.setState({ person: person });
    }

    const reject = (response) => console.log(response);
    Requester.get(route, resolve, reject);
  }

  openRemoveModal() { this.setState({ removeModalIsVisible: true }); }

  closeRemoveModal() { this.setState({ removeModalIsVisible: false }); }

  openAddModal() { this.setState({ addModalIsVisible: true }); }

  closeAddModal() { this.setState({ addModalIsVisible: false }); }

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
    const route = ApiConstants.students.instruments(this.props.id);
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

  renderAvailability() {
    // TODO:
  }

  handleDatetimeChange(moment, name) {
    if (name == 'waiver_date') {
      this.setState({ waiver_date: moment });
    }
  }

  render() {
    const { person } = this.props;
    let avail = availability_to_events(this.state.person.availability);
    let s = this.state.person;
    let addInstrumentModal;

    if (s.instruments) {
      addInstrumentModal = this.renderAddModal();
    }

    return (
      <div>
        <h2 className="settings-title">Your Profile</h2>

        <EditableInputGroup title="Student Information"
                            handleChange={this.handleChange.bind(this)}
                            attemptSave={this.attemptSave.bind(this)}
                            fetchProfile={this.fetchProfile.bind(this)}>
          <EditableInput label="First Name" name="first_name" data={s.first_name} />
          <EditableInput label="Last Name" name="last_name" data={s.last_name} />
          <EditableInput label="Gender" name="gender" data={s.gender}
            specialHandler={this.handleIntegerChange.bind(this)} />
          <EditableInput label="Birthday" name="birthday" data={moment(s.birthday).format("MM/DD/YYYY")} />
          <EditableInput label="Email" name="student_email" data={s.student_email} />
          <EditableInput label="School" name="school" data={s.school} />
          <EditableInput label="Grade" name="student_school_level" data={s.school_level}
            specialHandler={this.handleIntegerChange.bind(this)} />
          <EditableInput label="Student Phone Number" name="student_phone" data={s.student_phone} />
          <EditableInput label="Address" name="address" data={s.address} />
          <EditableInput label="Apt #" name="address_apt" data={s.address_apt} />
          <EditableInput label="City" name="city" data={s.city} />
          <EditableInput label="State" name="state" data={s.state}
            specialHandler={this.handleIntegerChange.bind(this)} />
          <EditableInput label="Zip Code" name="zipcode" data={s.zipcode} />
          <EditableInput label="Distance Willing to Travel" name="travel_distance"
            data={s.travel_distance} specialHandler={this.handleIntegerChange.bind(this)} />
        </EditableInputGroup>

        <EditableInputGroup title="Parent/Guardian Information"
                            handleChange={this.handleChange.bind(this)}
                            attemptSave={this.attemptSave.bind(this)}
                            fetchProfile={this.fetchProfile.bind(this)}>
          <EditableInput label="Parent/Guardian First Name" name="guardian_first_name" data={s.guardian_first_name} />
          <EditableInput label="Parent/Guardian Last Name" name="guardian_last_name" data={s.guardian_last_name} />
          <EditableInput label="Parent/Guardian Phone" name="guardian_phone" data={s.guardian_phone} />
          <EditableInput label="Parent/Guardian Email" name="email" data={s.email} />
        </EditableInputGroup>

        <EditableInputGroup title="Change Your Password"
                            handleChange={this.handleChange.bind(this)}
                            attemptSave={this.updateStudentPassword.bind(this)}
                            fetchProfile={this.fetchProfile.bind(this)}
                            personId={this.props.id}>
          <EditableInput label="New Password" name="password" data={s.password} />
          <EditableInput label="New Password Confirmation" name="password_confirmation" data={s.password_confirmation} />
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
          events={availability_to_events(this.state.person.availability)} />

        <Button className="button button--outline-orange button--sm availability-save-btn">Save</Button>

        <h5 className="profile-edit-note">Note: You will need to fill out all the fields</h5>
        <EditableInputGroup title="Payment"
                            handleChange={this.handleChange.bind(this)}
                            attemptSave={this.attemptCardSave.bind(this)}
                            fetchProfile={this.fetchProfile.bind(this)}>
          <EditableInput label="Card Number" name="card_number" data={s.card_number} error={this.state.errors} />
          <EditableInput label="CVC" name="cvc" data={s.cvc} error={this.state.errors}/>
          <EditableInput label="Expiration Month" name="exp_month" data={s.exp_month} error={this.state.errors}/>
          <EditableInput label="Expiration Year" name="exp_year" data={s.exp_year} error={this.state.errors}/>
          <EditableInput label="Billing Address Line 1" name="stripe_address_line1" data={s.stripe_address_line1} error={this.state.errors}/>
          <EditableInput label="Billing Address Line 2 (optional)" name="stripe_address_line2" data={s.stripe_address_line2} error={this.state.errors}/>
          <EditableInput label="City" name="stripe_address_city" data={s.stripe_address_city} error={this.state.errors}/>
          <EditableInput label="ZIP" name="stripe_address_zip" data={s.stripe_address_zip} error={this.state.errors}/>
        </EditableInputGroup>

        <EditableInputGroup title="Eligibility"
                            handleChange={this.handleChange.bind(this)}
                            attemptSave={this.attemptSave.bind(this)}
                            fetchProfile={this.fetchProfile.bind(this)}>
          <EditableInput label="Income Estimate" name="income_range" data={s.income_range}
            specialHandler={this.handleIntegerChange.bind(this)} />
          <EditableInput label="Household Number" name="household_number" data={s.household_number}
            specialHandler={this.handleIntegerChange.bind(this)} />
        </EditableInputGroup>
      </div>
    );
  }
}

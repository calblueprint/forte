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
        <div className="delete">
          <Button
            className="button button--outline-orange button--sm"
            onClick={() => this.openRemoveModal()}>
            Remove
          </Button>
          {this.renderRemoveModal(instrument)}
        </div>
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
    }
    console.log("datetime change " + this.state.birthday);
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
          <EditableInput label="Birthday" name="birthday" data={s.birthday}
            specialHandler={this.handleDatetimeChange.bind(this)} />
          <EditableInput label="Email" name="student_email" data={s.student_email} />
          <EditableInput label="School" name="school" data={s.school} />
          <EditableInput label="Grade" name="school_level" data={s.school_level}
            specialHandler={this.handleIntegerChange.bind(this)} />
          <EditableInput label="Student Phone Number" name="student_phone" data={s.student_phone} />
          <EditableInput label="Address" name="address" data={s.address} />
          <EditableInput label="Apt #" name="address_apt" data={s.address_apt} />
          <EditableInput label="City" name="city" data={s.city} />
          <EditableInput label="State" name="state" data={s.state} />
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

        <h2 className="section-title">Musical Experience</h2>
        {this.renderInstruments()}
        <Button className="button button--outline-orange button--sm"
          onClick={() => this.openAddModal()}>
          Add
        </Button>
        {addInstrumentModal}

        <h2 className="section-title">Scheduling</h2>
        <p className="form-input-description">Click and drag on the calendar to edit times that you're available.</p>
        <Calendar
          ref="settingsAvailability"
          isEditable={true}
          events={availability_to_events(this.state.person.availability)} />

        <Button className="button button--outline-orange button--sm">Save</Button>
        <div className="marginBot-xl"></div>

        <EditableInputGroup title="Payment"
                            handleChange={this.handleChange.bind(this)}
                            attemptSave={this.attemptCardSave.bind(this)}
                            fetchProfile={this.fetchProfile.bind(this)}>
          <EditableInput label="Card Number" name="card_number" data={s.card_number} />
          <EditableInput label="CVC" name="cvc" data={s.cvc} />
          <EditableInput label="Expiration Month" name="exp_month" data={s.exp_month} />
          <EditableInput label="Expiration Year" name="exp_year" data={s.exp_year} />
          <EditableInput label="Address 1" name="stripe_address_line1" data={s.stripe_address_line1} />
          <EditableInput label="Address 2" name="stripe_address_line2" data={s.stripe_address_line2} />
          <EditableInput label="City" name="stripe_address_city" data={s.stripe_address_city} />
          <EditableInput label="ZIP" name="stripe_address_zip" data={s.stripe_address_zip} />
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

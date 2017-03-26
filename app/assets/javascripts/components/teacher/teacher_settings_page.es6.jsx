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
    person.stripe_country = "US";
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
      console.log(route);
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

    const route = ApiConstants.teachers.update(this.props.teacher.id);
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
  }

  /*toggleEdit(editType) {
    this.setState({ editable : !this.state.editable,
                    editing_type: editType });
  }

  handleChange(event) {
    let target = $(event.target);
    this.setState({ [target.attr('name')] : target.val() });
  }

  formFields() {
    // Necessary because bootstrap-select does not fire onChange events
    const extraFields = { };
    $('.selectpicker').each((index, element) => {
      extraFields[$(element).attr("name")] = $(element).val();
    });
    return $.extend({}, this.state, extraFields);
  }

  attemptSave() {
    const route = ApiConstants.teachers.update(this.props.teacher.id);
    const params = this.formFields();
    const success = (response) => {
      this.setState({ editable: false });
    };
    const fail = (response) => {
      this.setState({ editable: true });
    };

    Requester.update(
        route,
        params,
        success,
        fail
    );
  }

  attemptStripeAccountSave() {
    // const route = ApiConstants.students.update(this.props.student.id);
    // const params = this.formFields();
    // console.log(params);

    // const success = (response) => {
    //   this.updateStripeCustomer(response);
    //   this.setState({ editable: false });
    // };
    // const fail = (response) => {
    //   this.updateStripeCustomer(response);
    //   this.setState({ editable: true });
    // };
    this.setState({ editable: false });
    this.updateStripeCustomer();

    // Requester.update(
        // route,
        // params,
        // success,
        // fail
    // );
  }

  async updateStripeCustomer() {
    const {
      stripe_country,
      stripe_routing_number,
      stripe_account_number,
      stripe_account_holder_name,
      stripe_account_holder_type
    } = this.state;

    // Only create customer if stripe validations pass - do not create token if there are stripe errors
    Stripe.bankAccount.createToken({
      country: stripe_country,
      currency: 'USD',
      routing_number: stripe_routing_number,
      account_number: stripe_account_number,
      account_holder_name: stripe_account_holder_name,
      account_holder_type: stripe_account_holder_type,
    }, this.stripeResponseHandler.bind(this));

  }

  // changeBankId(accountResponse) {
  //   // params.teacher.account_id = accountResponse.account.id;
  //   this.setState({ bank_id: accountResponse.bank_account.id });
  // }

  stripeResponseHandler(status, response) {
    const reject = (response) => { console.log("bad " + response) };
    const resolve = ((response) => { console.log("good" + response) });

    if (response.error) {
      console.log("error " + response.error);
    } else {
      var params = {
        stripe_token: response.id,
        email: this.state.email,
        country: this.state.stripe_country,
        account_id: this.state.account_id,
        bank_id: this.state.bank_id,
        teacher_id: this.state.teacher_id,
      };
      Requester.post(
        ApiConstants.stripe.changeAccount,
        params,
        resolve,
        reject
      );
    }
  }

  showInput(label, name, data, editableType) {
    return (
        <EditableInput label        = { label }
                       name         = { name }
                       data         = { data }
                       editable     = { this.state.editable }
                       editableType = { editableType }
                       editingType = { this.state.editing_type }
                       handleChange = { this.handleChange.bind(this) }
                       handleIntegerChange = { this.handleIntegerChange.bind(this) }
                       handleDatetimeChange = {this.handleDatetimeChange.bind(this) }/>
    );
  }
*/
  render() {
    const { person } = this.props;
    // let avail = availability_to_events(this.state.person.availability);

    let s = this.state.person;
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
        <EditableInput label="Email" name="teacher_email" data={s.email} />
        <EditableInput label="School" name="school" data={s.school} />
        <EditableInput label="Grade" name="school_level" data={s.school_level}
          specialHandler={this.handleIntegerChange.bind(this)} />
        <EditableInput label="Teacher Phone Number" name="teacher_phone" data={s.phone} />
        <EditableInput label="Address" name="address" data={s.address} />
        <EditableInput label="Apt #" name="address_apt" data={s.address_apt} />
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
        events={availability_to_events(s.availability)} />

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
          <EditableInput label="Bank Account Holder Type" name="stripe_account_holder_type"
            data={s.stripe_account_holder_type}
            specialHandler={this.handleIntegerChange.bind(this)} />
          <EditableInput label="Routing Number" name="stripe_routing_number" data={s.stripe_routing_number} />
          <EditableInput label="Bank Account Number" name="stripe_account_number" data={s.stripe_account_number} />
          <EditableInput label="Address" name="stripe_address_line1" data={s.stripe_address_line1} />
          <EditableInput label="City" name="stripe_address_city" data={s.stripe_address_city} />
          <EditableInput label="State" name="stripe_address_state"
            data={s.stripe_address_state}
            specialHandler={this.handleIntegerChange.bind(this)} />
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
          <EditableInput label="Reference 2 First Name" name="reference2_first_name" data={s.reference2_first_name} />
          <EditableInput label="Reference 2 Last Name" name="reference2_last_name" data={s.reference2_last_name} />
          <EditableInput label="Reference 2 Relationship" name="reference2_relation" data={s.reference2_relation} />
          <EditableInput label="Reference 2 Email" name="reference2_email" data={s.reference2_email} />
          <EditableInput label="Reference 2 Phone" name="reference2_phone" data={s.reference2_phone} />
        </EditableInputGroup>
    </div>
    );
  }
}

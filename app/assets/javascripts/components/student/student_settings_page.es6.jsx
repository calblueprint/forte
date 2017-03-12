class StudentSettingsPage extends UserSettings {

  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      student: React.PropTypes.object.isRequired,
    };
  }

  componentWillReceiveProps(props) {
    const { student } = props;

    this.setState({
      first_name: student.first_name,
      last_name: student.last_name,
      addModalIsVisible: false,
      removeModalIsVisible: false,
      instruments: null,
      availability: student.availability,
      gender: student.gender,
      birthday: student.birthday,
      student_email: student.student_email,
      school: student.school,
      school_level: student.school_level,
      student_phone: student.student_phone,
      address: student.address,
      address_apt: student.address_apt,
      city: student.city,
      state: student.state,
      zipcode: student.zipcode,
      guardian_first_name: student.guardian_first_name,
      guardian_last_name: student.guardian_last_name,
      guardian_phone: student.guardian_phone,
      email: this.props.email,
      location_preference: student.location_preference,
      income_range: student.income_range,
      household_number: student.household_number,
      editable: false,
      editable_type: null,
      editing_type: null,
      card_number: "*****",
      cvc: "*****",
      exp_month: "*****",
      exp_year: "*****",
      cardholder_name: "*****",
      stripe_address_line1: "*****",
      stripe_address_line2: "*****",
      stripe_address_city: "*****",
      stripe_address_state: "*****",
      stripe_address_zip: "*****",
      email: student.email,
      customer_id: student.customer_id,
    })
  }

  fetchInstruments() {
    const route = ApiConstants.students.instruments(this.props.id);
    console.log(route)
    const resolve = (response) => this.setState({ instruments: response.instruments });
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
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
    const { addModalIsVisible, instruments } = this.state;
    const { student } = this.props;

    if (addModalIsVisible) {
      return (
        <AddInstrumentModal
          isVisible={addModalIsVisible}
          handleClose={() => this.closeAddModal()}
          fetchInstruments={() => this.fetchInstruments()}
          instruments={instruments}
          instrumentable={student}
        />
      )
    }
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
    const { instruments } = this.state;
    if (instruments) {
      return instruments.map((instrument) => this.renderInstrument(instrument));
    }
  }

  renderAvailability() {
    // TODO:
  }

  render() {
    // var avail = availability_to_events(this.state.availability);
    const { student } = this.props;
    let s = this.state;

    return (
      <div>
        <h2 className="title">
          Settings
        </h2>

        <div className="">
          <h2 className="section-title">
            Student Information
          </h2>

          <EditableInputGroup>
            <EditableInput label={"First Name"} name={"first_name"} data={s.first_name}/>
            <EditableInput label={"Last Name"} name={"last_name"} data={s.last_name}/>
            <EditableInput label={"Gender"} name={"gender"} data={s.gender}/>
            <EditableInput label={"Birthday"} name={"birthday"} data={s.birthday}/>
            <EditableInput label={"Email"} name={"student_email"} data={s.student_email}/>
            <EditableInput label={"School"} name={"school"} data={s.school}/>
            <EditableInput label={"Grade"} name={"school_level"} data={s.school_level}/>
            <EditableInput label={"Phone Number"} name={"student_phone"} data={s.student_phone}/>
            <EditableInput label={"Address"} name={"address"} data={s.address}/>
            <EditableInput label={"Apt #"} name={"address_apt"} data={s.address_apt}/>
            <EditableInput label={"City"} name={"city"} data={s.city}/>
            <EditableInput label={"State"} name={"state"} data={s.state}/>
            <EditableInput label={"Zip Code"} name={"zipcode"} data={s.zipcode}/>
          </EditableInputGroup>
        </div>
      </div>
    );
  }
}

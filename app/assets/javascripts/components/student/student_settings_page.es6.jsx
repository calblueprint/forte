/**
 * Page to allow students to change user settings
 * @prop fetchProfile - callback function to refresh profile with updated fields
 * @prop isAdmin      - whether an admin is accessing the settings page
 * @prop person       - object of student information
 * @prop id           - id of student
 */
class StudentSettingsPage extends UserSettings {

  static get propTypes() {
    return {
      fetchProfile : React.PropTypes.func.isRequired,
      isAdmin      : React.PropTypes.bool.isRequired,
      person       : React.PropTypes.object.isRequired,
      id           : React.PropTypes.number.isRequired,
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
    person.stripe_address = "*****";

    this.state = {
      addModalIsVisible: false,
      removeModalIsVisible: false,
      person: person,
      id: this.props.id,
      errors: {},
    }
  }

  /**
   * Fetches the profile and instruments on load
   */
  componentDidMount() {
    this.fetchProfile();
    this.fetchInstruments();
  }

  /**
   * Fetches the student profile from backend
   */
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

  /**
   * Shows the removeInstrument modal
   * @param instrument - the instrument to be deleted
   */
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

  /**
   * Fetches the student's instruments from backend
   */
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

  /**
   * Handler for waiver date change
   * @param moment - the moment time object
   * @param name   - the name of the input field
   */
  handleDatetimeChange(moment, name) {
    if (name == 'waiver_date') {
      this.setState({ waiver_date: moment });
    }
  }

  /**
   * Saves the updated availability from calendar
   */
  saveAvailability() {
    const { calendar } = this.refs.settingsAvailability.refs
    var eventArray = $(calendar).fullCalendar('clientEvents');

    var availabilityArray = []
    for (var i = 0; i < eventArray.length; i++) {
      availabilityArray = availabilityArray.concat(range_to_array(eventArray[i]['start'], eventArray[i]['end']));
    }
    this.setState({ availability: availabilityArray});

    const route = ApiConstants.students.update(this.props.id);
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

  /**
   * Renders the avaibility calendar
   * @param s - the student object being edited
   */
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
    let avail = availability_to_events(this.state.person.availability);
    let s = this.state.person;
    let addInstrumentModal;

    if (s.instruments) {
      addInstrumentModal = this.renderAddModal();
    }

    /**
     * If an admin is accessing the student settings page, don't show them the
     * change password or payment section.
     */
   let passwordSection, paymentSection;

    if (!isAdmin) {
      passwordSection = (
        <EditableInputGroup title="Change Your Password"
                            handleChange={this.handleChange.bind(this)}
                            attemptSave={this.updateStudentPassword.bind(this)}
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
                              attemptSave={this.attemptCardSave.bind(this)}
                              fetchProfile={this.fetchProfile.bind(this)}>
            <EditableInput label="Card Number" name="card_number" data={s.card_number} error={this.state.errors} />
            <EditableInput label="CVC" name="cvc" data={s.cvc} error={this.state.errors}/>
            <EditableInput label="Expiration Month" name="exp_month" data={s.exp_month} error={this.state.errors}/>
            <EditableInput label="Expiration Year" name="exp_year" data={s.exp_year} error={this.state.errors}/>
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
          </EditableInputGroup>
        </div>
      )
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
          <EditableInput label="Birthday" name="birthday" data={moment(s.birthday).format("MM/DD/YYYY")}
            specialHandler={this.handleBirthdayChange.bind(this)} />
          <EditableInput label="Email" name="student_email" data={s.student_email} />
          <EditableInput label="School" name="school" data={s.school} />
          <EditableInput label="Grade" name="student_school_level" data={s.school_level}
            specialHandler={this.handleIntegerChange.bind(this)} />
          <EditableInput label="Student Phone Number" name="student_phone" data={s.student_phone} />
        </EditableInputGroup>

        <EditableInputGroup title="Student Address"
                            handleChange={this.handleChange.bind(this)}
                            attemptSave={this.attemptAddressSave.bind(this)}
                            fetchProfile={this.fetchProfile.bind(this)}>
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

        <EditableInputGroup title="Parent/Guardian Information"
                            handleChange={this.handleChange.bind(this)}
                            attemptSave={this.attemptSave.bind(this)}
                            fetchProfile={this.fetchProfile.bind(this)}>
          <EditableInput label="Parent/Guardian First Name" name="guardian_first_name" data={s.guardian_first_name} />
          <EditableInput label="Parent/Guardian Last Name" name="guardian_last_name" data={s.guardian_last_name} />
          <EditableInput label="Parent/Guardian Phone" name="guardian_phone" data={s.guardian_phone} />
          <EditableInput label="Parent/Guardian Email" name="email" data={s.email} />
        </EditableInputGroup>

        { passwordSection }

        <h2 className="section-title">Musical Experience</h2>
        {this.renderInstruments()}
        <Button className="button button--outline-orange button--sm marginTop-md"
          onClick={() => this.openAddModal()}>
          Add Another Instrument
        </Button>
        {addInstrumentModal}

        <h2 className="section-title">Scheduling</h2>
        <p className="form-input-description">Click and drag on the calendar to edit times that you're available.</p>
        {this.renderCalendar(s)}
        <Button
          className="button button--outline-orange button--sm availability-save-btn"
          onClick={() => this.saveAvailability(s.availability)}>
          Save
        </Button>

        { paymentSection }

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

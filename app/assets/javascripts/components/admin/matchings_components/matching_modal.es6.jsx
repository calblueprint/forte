/**
 * @prop handleClose - function to handle closing this modal
 * @prop student     - student object that is being matched
 * @prop teacher     - teacher object that is being matched
 * @prop instrument  - instrument object that this pair is being matched for
 */
class MatchingModal extends React.Component {

  constructor() {
    super();
    this.state = {
      showNextScreen: false,
      lessonTime: [],
      location: '',
      default_price: '0',
      errors: '',
      loading: false,
    };
  }

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func.isRequired,
      student: React.PropTypes.object.isRequired,
      teacher: React.PropTypes.object.isRequired,
      instrument: React.PropTypes.string.isRequired,
    };
  }

  /** Validates all selections, then allows admin to proceed */
  async handleNext() {
    await this.setState({ errors: '' });
    await this.validateForm();
    await this.setLessonTime();
    const { errors } = this.state;
    if (errors == '') {
      this.setState({ showNextScreen: true });
    }
  }

  /** If admin clicks back, resets the state */
  handleBack() {
    this.setState({
      showNextScreen: false,
      location: '',
      lessonTime: [],
      default_price: '',
    });
  }

  handleChange(event) {
    var name = $(event.target).attr("name");
    var value = $(event.target).val();
    this.setState({ [name] : value });
  }

  /** Validates the location and default price */
  validateForm() {
    const { location, default_price } = this.state;
    // Make sure the admin selected a location
    if (location == '') {
      this.setState({ errors: "Please choose a location for the lesson."});
    }
    // Make sure the admin specified a default price
    if (default_price == '') {
      this.setState({ errors: "Please choose a default price for the lesson."});
    }
    return true;
  }

  /**
    * Validate the selected lesson time, then set the lesson time
    */
  setLessonTime() {
    const { calendar } = this.refs.calendar.refs;
    // Get the selected times from the calendar
    var eventArray = $(calendar).fullCalendar('clientEvents', (event) => {
      if (event.rendering == 'background') {
        return false;
      }
      return true;
    });
    // Make sure admin did not select more than one lesson time
    if (eventArray.length != 1) {
      this.setState({ errors: "Make sure only one lesson time is selected." });
      return false;
    }
    // Check to make sure lesson length is valid
    var lessonTime = range_to_array(eventArray[0]['start'], eventArray[0]['end']);
    if (lessonTime.length < 2 || lessonTime.length > 4) {
      this.setState({ errors: "Make sure the lesson is 30-60 minutes long." });
      return false;
    }
    this.setState({ lessonTime: lessonTime });
    return true;
  }

  /** Attempt to create a matching object in the backend */ 
  makeMatching() {
    this.setState({ loading: true });
    const { student, teacher, instrument } = this.props;
    const { lessonTime, location, default_price } = this.state;
    route = ApiConstants.matchings.create;
    var params = {
      matching: {
        student_id: student.id,
        teacher_id: teacher.id,
        instrument: instrument,
        location: location,
        lesson_time: lessonTime,
        default_price: parseInt(default_price),
      },
      timezone: student.timezone,
    };
    var resolve = (response) => {
      window.location = RouteConstants.admin.unmatched;
      toastr.success("Matching was created successfully");
    };
    var reject = (response) => toastr.error(response.message);
    Requester.post(
      route,
      params,
      resolve,
      reject,
    );
  }

  renderErrors() {
    const { errors } = this.state;
    if (errors != '') {
      return (
        <Alert bsStyle="danger">
          {errors}
        </Alert>
      )
    };
  }

  renderBody() {
    let loadingContainer;
    if (this.state.loading) {
      loadingContainer = <div className="loading-container">
        <div className="loading"></div>
      </div>
    }
    const { handleClose, student, teacher } = this.props;
    const { showNextScreen } = this.state;
    // Get the student and teacher's overlapping availability
    var overlappingAvailability = intersection(student.availability, teacher.availability);
    // If teacher has offered to host lessons, add the teacher's house as a location option
    if (teacher.location_preference) {
      locationOptions = (
        <div>
          <option
            value={teacher.full_address}>
            Teacher's House
          </option>
          <option
            value={student.full_address}>
            Student's House
          </option>
        </div>
      );
    } else {
      locationOptions = (
        <option
          value={student.full_address}>
          Student's House
        </option>
      );
    }
    // If teacher is not teaching for free, add a default price field
    let defaultPrice, teachForFreeInfo;
    if (!teacher.teach_for_free) {
      defaultPrice =
      <FormGroup>
        <ControlLabel>Default Price</ControlLabel>
        <InputGroup>
          <InputGroup.Addon>$</InputGroup.Addon>
          <FormControl
            componentClass="input"
            name="default_price"
            type="number"
            onChange={(event) => this.handleChange(event)}>
          </FormControl>
          <InputGroup.Addon>.00</InputGroup.Addon>
        </InputGroup>
      </FormGroup>
    } else {
      teachForFreeInfo = <h4>This teacher has decided to teach for free!</h4>
    }
    // If the admin has clicked match, render a modal asking for confirmation
    if (showNextScreen) {
      return (
        <div>
          <Modal.Body>
            {loadingContainer}
            Are you sure you wish to match student {student.full_name} with teacher {teacher.full_name}? Emails will
            be sent out to both of them notifying them of their match.
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={() => this.handleBack()}>Back</Button>
            <Button className="button button--solid-orange" onClick={() => this.makeMatching()}>Confirm</Button>
          </Modal.Footer>
        </div>
      )
    } else {
      return (
        <div>
          <Modal.Body>
            {this.renderErrors()}
            <FormGroup>
              <MatchingCalendar
                ref="calendar"
                availability={overlappingAvailability}
                timezone={student.timezone} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Location</ControlLabel>
              <FormControl
                componentClass="select"
                name="location"
                onChange={(event) => this.handleChange(event)}>
                <option value="" disabled selected>Select a lesson location</option>
                {locationOptions}
              </FormControl>
            </FormGroup>
            {teachForFreeInfo}
            {defaultPrice}
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Cancel</Button>
            <Button className="button button--solid-orange" onClick={() => this.handleNext()}>OK</Button>
          </Modal.Footer>
        </div>
      );
    }
  }

  render() {
    const { handleClose } = this.props;
    return (
      <div>
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Matching</Modal.Title>
          </Modal.Header>
          {this.renderBody()}
        </Modal>
      </div>
    );
  }
}

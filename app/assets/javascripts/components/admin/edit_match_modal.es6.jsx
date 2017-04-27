/**
 * @prop show          - show the modal
 * @prop handleClose   - function to close the modal
 * @prop matching      - matching object
 */
class EditMatchModal extends React.Component {

  static get propTypes() {
    return {
      show: React.PropTypes.bool,
      handleClose: React.PropTypes.func,
      matching: React.PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.setLessonTime = this.setLessonTime.bind(this);
  }

  componentDidMount() {
    const { cal } = this.refs;
    const { student, teacher, matching } = this.props;
    const { timezone } = student;
    const { lesson_time } = matching;

    let prev_time = availability_to_events(lesson_time, timezone)[0];
    let startTime = prev_time.start;
    let endTime = prev_time.end;

    let availability = intersection(student.availability, teacher.availability);
    var unavailibility = get_unavailable_availability(availability);

    // first push the unavailable events
    var events = availability_to_events(unavailibility, timezone);
    events.map((event) => {
      event.rendering = 'background';
      event.color = 'grey';
    });

    // push the existing lesson to events array
    events.push({
      title: 'Lesson',
      start: startTime,
      end: endTime,
    });

    $(cal).fullCalendar({
      header: false,
      defaultView: 'agendaWeek',
      defaultDate: startTime,
      columnFormat: 'ddd M/D',
      timezone: timezone,
      selectable: false,
      editable: true,
      minTime: "08:00",
      maxTime: "22:00",
      allDaySlot: false,
      height: 'auto',
      eventOverlap: false,
      selectOverlap: false,
      displayEventTime: true,
      selectHelper: true,
      selectConstraint: { //won't let you drag to the next day
        start: '00:01',
        end: '23:59',
      },
      eventConstraint: { //can't drag events out of bound
        start: "08:00",
        end: "22:00",
      },
      events: events,
      eventDrop: this.setLessonTime,
      eventResize: this.setLessonTime,
      snapMinutes: 15,
      snapDuration: '00:15:00',
    });
    var eventArray = $(cal).fullCalendar('clientEvents');

  }

  /**
   * Handles changes for setting the state.
   * @param event Object React event
   */
  handleChange(event) {
    this.setState({
      [$(event.target).attr("name")] : $(event.target).val(),
    });
  }

  /**
   * Sets the new lesson times.
   * @param event Object React event
   */
  setLessonTime(event) {
    let { start, end } = event;
    let new_start = moment(start);
    let new_end = moment(end);
    const offset = moment().tz(this.props.student.timezone).utcOffset();

    // need to add the timezone offset to maintain the timezone, since the calendar returns UTC times.
    new_start = new_start.add(-offset, 'minutes');
    new_end = new_end.add(-offset, 'minutes');
    let updatedLessonTime = range_to_array(new_start, new_end);

    this.setState({ lesson_time: updatedLessonTime });
  }

  /**
   * Handles edits for the matchings
   */
  handleEdit() {
    const { id } = this.props.matching;

    const route = ApiConstants.matchings.update(id);
    const params = this.state;
    const resolve = (response) => {
      this.props.refetch();
      this.props.handleClose();
      toastr.success("Matching successfully updated!");
    }

    const reject = (response) => {
      console.log(response);
      this.props.handleClose();
      toastr.success("An error has occurred. Please try again!");
    }

    Requester.update(route, params, resolve, reject);
  }

  /**
   * Renders the summary information.
   */
  renderSummary() {
    const { student, teacher } = this.props;

    let studentName = `${student.first_name} ${student.last_name}`;
    let teacherName = `${teacher.first_name} ${teacher.last_name}`;

    return (
      <div className="matching-summary">
        <div className="matching-summary-item">
          <div className="label">Student</div>
          <h4 className="info">{studentName}</h4>
        </div>
        <div className="matching-summary-item">
          <div className="label">Teacher</div>
          <h4 className="info">{teacherName}</h4>
        </div>
        <div className="matching-summary-item">
          <div className="label">Instrument</div>
          <h4 className="info">{this.props.matching.instrument}</h4>
        </div>
      </div>
    )
  }

  render () {
    const { matching, student, teacher } = this.props;

    return(
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Matching</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderSummary()}

          <div className="form-row">
            <FormGroup>
              <ControlLabel>Price</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl type="input"
                  name="default_price"
                  defaultValue={parseFloat(matching.default_price).toFixed(2)}
                  onChange={this.handleChange} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Location</ControlLabel>
              <FormControl type="input"
                name="location"
                defaultValue={matching.location}
                onChange={this.handleChange} />
            </FormGroup>
          </div>

          <p>Note: Calendar displayed in timezone <b>{student.timezone}</b></p>
          <div ref="cal"></div>

        </Modal.Body>
        <Modal.Footer>
          <Button className="button button--outline-orange button--left"
            onClick={this.props.handleClose}>Cancel Edit</Button>
          <Button className="button button--solid-orange"
            onClick={this.handleEdit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

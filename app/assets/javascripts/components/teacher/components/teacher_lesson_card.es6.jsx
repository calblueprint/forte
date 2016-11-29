class TeacherLessonCard extends React.Component {

  constructor() {
    super();
    this.state = {
      showCancelModal: false,
      showRescheduleModal: false,
    };
  }

  static get propTypes() {
    return {
      lesson: React.PropTypes.object,
      fetchLessons: React.PropTypes.func.isRequired,
    };
  }

  openCancelModal() {
    this.setState({ showCancelModal: true });
  }

  closeCancelModal() {
    this.setState({ showCancelModal: false });
  }

  openRescheduleModal() {
    this.setState({ showRescheduleModal: true });
  }

  closeRescheduleModal() {
    this.setState({ showRescheduleModal: false });
  }

  renderCancelModal() {
    const { lesson, handleCancelLesson, fetchLessons } = this.props;
    const { showCancelModal } = this.state;

    if (showCancelModal) {
      return (
        <CancelModal
          lesson={lesson}
          handleClose={() => this.closeCancelModal()}
          fetchLessons={fetchLessons}
          isStudent={false}
        />
      );
    }
  }

  renderRescheduleModal() {
    const { lesson, fetchLessons } = this.props;
    const { showRescheduleModal } = this.state;
    if (showRescheduleModal) {
      return (
        <RescheduleModal
          lesson={lesson}
          handleClose={() => this.closeRescheduleModal()}
          fetchLessons={fetchLessons}
          isStudent={false}
        />
      );
    }
  }

  render() {
    const { lesson } = this.props;
    const {
      price,
      start_time,
      teacher,
      student,
      matching,
      is_paid,
    } = lesson;

    var startTime = moment(lesson['start_time']);
    var paid = is_paid ? 'Paid' : 'Unpaid';
    //TODO: Make sure right timezones and stuff

    return (
      <div className="teacher-lesson-card">
        <div className="lesson-time-container">
          <h2>{startTime.format('MMM DD').toUpperCase()}</h2>
          <h4>{startTime.format('hh:mm A').toUpperCase()}</h4>
        </div>
        <div className="logistics">
          <h4> {matching.instrument} Lesson </h4>
          <div className="info-row">
            <img src={ImageConstants.icons.person} href="#" />
            <h6>{student.first_name} {student.last_name}</h6>
          </div>
        </div>
        <div className="details">
          <div className="info-row">
            <img src={ImageConstants.icons.location} href="#" />
            <h6>Home</h6>
          </div>
          <p>{teacher.city}</p>
          <div className="cost">
            <div className="cost-icon">
            </div>
            <p>${price}</p>
          </div>
        </div>
         <div className="actions">
          <Button className="button button--outline-orange" onClick={() => this.openCancelModal()}>
          Cancel
          </Button>
          {this.renderCancelModal()}
          <Button className="button button--outline-orange" onClick={() => this.openRescheduleModal()}>
          Reschedule
          </Button>
          {this.renderRescheduleModal()}
        </div>
      </div>
    );
  }
}

class LessonCard extends React.Component {

  constructor() {
    super();
    this.state = {
      showCancelModal: false,
      showRescheduleModal: false,
      showPayModal: false,
    };
  }

  static get propTypes() {
    return {
      isStudent: React.PropTypes.bool,
      lesson: React.PropTypes.object,
      fetchLessons: React.PropTypes.func,
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

  openPayModal() {
    this.setState({ showPayModal: true });
  }
  closePayModal() {
    this.setState({ showPayModal: false });
  }

  renderCancelModal() {
    const { isStudent, lesson, fetchLessons } = this.props;
    const { showCancelModal } = this.state;

    if (showCancelModal) {
      return (
        <CancelModal
          lesson={lesson}
          handleClose={() => this.closeCancelModal()}
          fetchLessons={fetchLessons}
          isStudent={isStudent}
        />
      );
    }
  }

  renderRescheduleModal() {
    const { isStudent, lesson, fetchLessons } = this.props;
    const { showRescheduleModal } = this.state;
    if (showRescheduleModal) {
      return (
        <RescheduleModal
          lesson={lesson}
          handleClose={() => this.closeRescheduleModal()}
          fetchLessons={fetchLessons}
          isStudent={isStudent}
        />
      );
    }
  }

  renderButtons() {
    const { lesson } = this.props;
    const {
      start_time,
      is_paid,
    } = lesson;

    var now = moment();
    var date = moment(start_time);

    if (date > now) {
      return (
        <div className="actions">
          <Button className="button button--outline-orange button--sm" onClick={() => this.openCancelModal()}>
          Cancel
          </Button>
          {this.renderCancelModal()}
          <Button className="button button--outline-orange button--sm" onClick={() => this.openRescheduleModal()}>
          Reschedule
          </Button>
          {this.renderRescheduleModal()}
        </div>
      );
    } else if (!is_paid && now > date) {
      return (
        <div className="actions">
        <Button className="button button--outline-orange button--sm" onClick={() => this.openPayModal()}>
          Pay Now
        </Button>
        </div>
      );
    } else {
      return (
        <div className="actions" />
      )
    }
  }

  renderPayButton() {
    
  }

  renderPayModal() {
    const { lesson } = this.props;
    const { showPayModal } = this.state;
    if (showPayModal) {
      return (
        <PayModal
          lesson={lesson}
          handleClose={() => this.closePayModal()}
        />
      );
    }
  }

  render() {
    const { isStudent, lesson } = this.props;
    const {
      price,
      start_time,
      teacher,
      student,
      matching,
      is_paid,
    } = lesson;

    var startTime = moment(start_time);
    //TODO: Make sure right timezones and stuff
    if (isStudent) {
      var name = `${teacher.first_name} ${teacher.last_name}`;
    } else {
      var name = `${student.first_name} ${student.last_name}`;
    }
    var paidLabelText = is_paid ? 'Paid' : 'Unpaid';
    var paidLabelStyle = is_paid ? 'success' : 'danger';
    
    return (
      <div className="lesson-card">
        <div className="lesson-time-container">
          <h2>{startTime.format('MMM DD').toUpperCase()}</h2>
          <h4>{startTime.format('ddd').toUpperCase()} {startTime.format('hh:mm A').toUpperCase()}</h4>
        </div>
        <div className="logistics">
          <h4>{matching.instrument} Lesson</h4>
          <div className="cost">
            <div className="info-row">
              <h5>${price}</h5>
              <Label bsStyle={paidLabelStyle}>{paidLabelText}</Label>
              {this.renderPayModal()}
            </div>
          </div>
        </div>
        <div className="details">
          <div className="info-row">
            <img src={ImageConstants.icons.person} href="#" />
            <h5>{name}</h5>
          </div>
          <div className="info-row">
            <img src={ImageConstants.icons.location} href="#" />
            <h5>{lesson.location}</h5>
          </div>
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

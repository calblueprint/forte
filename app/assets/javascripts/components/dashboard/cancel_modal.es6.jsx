class CancelModal extends React.Component {

  constructor() {
    super();
    this.state = {
      showNextScreen: false,
    };
  }

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func.isRequired,
      fetchUpcomingLessons: React.PropTypes.func.isRequired,
      lesson: React.PropTypes.object.isRequired,
      isStudent: React.PropTypes.bool.isRequired,
    };
  }

  handleNext() {
    this.setState({ showNextScreen: true });
  }

  handleConfirmClick() {
    //TODO: Check difference of current time and lesson time and charge
    //cancellation fee if necessary
    const { lesson, handleClose, fetchUpcomingLessons } = this.props;

    const route = ApiConstants.lessons.delete(lesson.id);
    const resolve = (response) => {
      handleClose();
      fetchUpcomingLessons();
    }
    const reject = (response) => console.log(response);
    Requester.delete(
      route,
      resolve,
      reject,
    );
  }

  renderCancelModal() {
    const { handleClose, lesson, isStudent } = this.props;
    const {
      price,
      start_time,
      teacher,
      student,
    } = lesson;
    const { showNextScreen } = this.state;
    var startTime = moment(lesson['start_time']);
    var name = isStudent ? `${teacher.first_name} ${teacher.last_name}` : `${student.first_name} ${student.last_name}`;
    if (showNextScreen) {
      return (
        <div>
          <Modal.Body>
            <p>
              We will notify {name} of this week's cancelled lesson upon confirmation.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Close</Button>
            <Button className="button button--solid-orange" onClick={() => this.handleConfirmClick()}>Confirm</Button>
          </Modal.Footer>
        </div>
      );
    }
    else {
      return (
        <div>
          <Modal.Body>
            <p>Please confirm that you would like to cancel this lesson at {startTime.format('MMM Do hh:mm A')}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Close</Button>
            <Button className="button button--solid-orange" onClick={() => this.handleNext()}>Next</Button>
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
            <Modal.Title>Cancel Lesson</Modal.Title>
          </Modal.Header>
          {this.renderCancelModal()}
        </Modal>
      </div>
    );
  }
}

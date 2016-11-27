class StudentRescheduleModal extends React.Component {

  constructor() {
    super();
    this.state = {
      showNextScreen: false,
      lessonStartTime: null,
      lessonEndTime: null,
    };
  }

  static get propTypes() {
    return {
      fetchLessons: React.PropTypes.func,
      handleClose: React.PropTypes.func,
      lesson: React.PropTypes.object.isRequired,
    };
  }

  handleNext() {
    this.setState({ showNextScreen: true });
    this.setLessonTime();
  }

  handleBack() {
    this.setState({ showNextScreen: false });
  }

  setLessonTime() {
    const { calendar } = this.refs.rescheduler.refs
    //TODO: not ideal way to do this.. figure out some other way
    var eventArray = $(calendar).fullCalendar('clientEvents');
    this.setState({ lessonStartTime: eventArray[0]['start'].format() });
    this.setState({ lessonEndTime: eventArray[0]['end'].format() });

    // var availabilityArray = []
    // for (var i = 0; i < eventArray.length; i++) {
    //   availabilityArray = availabilityArray.concat(range_to_array(eventArray[i]['start'], eventArray[i]['end']));
    // }
    // this.setState({ lessonTime: availabilityArray[0] })
  }

  handleRescheduleLesson() {
    const { lesson, handleClose, fetchLessons } = this.props;
    const { lessonStartTime, lessonEndTime } = this.state;

    const route = ApiConstants.lessons.update(lesson.id);
    const params = {
      lesson: {
        start_time: lessonStartTime,
        end_time: lessonEndTime,
      }
    }
    const resolve = (response) => {
      handleClose();
      fetchLessons();
    }
    const reject = (response) => console.log(response);
    Requester.update(
      route,
      params,
      resolve,
      reject,
    );
  }

  renderRescheduleModal() {
    const { handleClose, lesson } = this.props;
    const { showNextScreen, lessonStartTime } = this.state;
    if (showNextScreen) {
      return (
        <div>
          <Modal.Body>
            Are you sure you wish to reschedule this lesson to {lessonStartTime}
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={() => this.handleBack()}>Back</Button>
            <Button className="button button--solid-orange" onClick={() => this.handleRescheduleLesson()}>Confirm</Button>
          </Modal.Footer>
        </div>
      )
    } else {
      return (
        <div>
          <Modal.Body>
            <RescheduleCalendar 
              ref="rescheduler" 
              lesson={lesson}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Cancel</Button>
            <Button className="button button--solid-orange" onClick={() => this.handleNext()}>Confirm</Button>
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
          {this.renderRescheduleModal()}
        </Modal>
      </div>
    );
  }
}

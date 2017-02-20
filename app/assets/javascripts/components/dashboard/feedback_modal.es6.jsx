class FeedbackModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  handleChange(event) {
    var name = $(event.target).attr("name");
    var value = $(event.target).val();
    this.setState({ [name] : value });
  }

  submitFeedback() {
    const route = ApiConstants.lessons.update(this.props.lesson.id);
    const params = {
      lesson: {
        student_feedback: this.state.student_feedback,
      }
    }
    const resolve = (response) => { this.setState({ submitted: true }); };
    const reject = (response) => { console.log(response) };

    Requester.update(
      route,
      params,
      resolve,
      reject,
    )
  }

  renderFeedbackInput() {
    const lessonTime = moment(this.props.lesson.start_time).format("dddd, MMM Do");
    return (
      <div>
        <Modal.Body>
          <p>Thanks for using Forte! Please leave some feedback
          about your most recent lesson on <strong>{lessonTime}</strong>.</p>

          <p>Your feedback is extremely valuable and helps us deliver a better experience!</p>

          <FormGroup className="marginTop-md">
            <ControlLabel>Comments</ControlLabel>
            <p className="form-input-description">Only Forte Admins will see what you write here.</p>
            <FormControl
              className="feedback-input"
              componentClass="textarea"
              name="student_feedback"
              onChange={(event) => this.handleChange(event)}>
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button button--outline-orange pull-left"
            onClick={this.props.handleClose}>Close</Button>
          <Button className="button button--solid-orange"
            onClick={this.submitFeedback.bind(this)}>Send Feedback</Button>
        </Modal.Footer>
      </div>
    )
  }

  renderSuccessView() {
    const imgUrl = ImageConstants.instruments.all;

    return (
      <div>
        <Modal.Body>
          <div className="feedback-img-container">
            <img src={imgUrl} alt="photo of instruments"/>
          </div>
          <h2 className="feedback-success">Thank you for your feedback! We will use your comments to improve Forte in the future.</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button button--solid-orange"
            onClick={this.props.handleClose}>Return to Dashboard</Button>
        </Modal.Footer>
      </div>
    )
  }

  render() {
    let modalView;
    if (!this.state.submitted) {
      modalView = this.renderFeedbackInput();
    } else {
      modalView = this.renderSuccessView();
    }

    return (
      <div>
        <Modal show={true} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Lesson Feedback</Modal.Title>
          </Modal.Header>
          {modalView}
        </Modal>
      </div>
    );
  }
}

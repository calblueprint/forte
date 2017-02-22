class PayModal extends React.Component {

  constructor() {
    super();
    this.state = {
      showNextScreen: false,
    };
  }

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func.isRequired,
      lesson: React.PropTypes.object.isRequired,
      fetchRecentLessons: React.PropTypes.func.isRequired,
    };
  }

  handleNext() {
    this.setState({ showNextScreen: true });
  }

  makePayment() {
    const { handleClose, lesson } = this.props;
    const {
      price,
      teacher,
      student,
    } = lesson;
    const resolve = (response) => { this.updateLessonPaid() };
    const reject = (response) => { console.log(response) };

    var stripePrice = priceToStripePrice(price);
    var params = {
      amount: stripePrice,
      teacher_id: teacher.id,
      student_id: student.id,
    };

    Requester.post(
      ApiConstants.stripe.charge,
      params,
      resolve,
      reject
    );
  }

  updateLessonPaid() {
    const { handleClose, lesson, fetchRecentLessons } = this.props;
    const resolve = (response) => {
      handleClose();
      fetchRecentLessons();
    };
    const reject = (response) => { console.log(response) };

    var params = {
      is_paid: true,
    };

    Requester.update(
      ApiConstants.lessons.update(lesson.id),
      params,
      resolve,
      reject
    );
  }

  renderPayModal() {
    const { handleClose, lesson } = this.props;
    const { showNextScreen } = this.state
    const {
      price,
      teacher,
    } = lesson;
    if (showNextScreen) {
      return (
        <div>
          <Modal.Body>
            <p>
              We will charge ${price} on your credit card and pay {teacher.first_name} {teacher.last_name}.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Close</Button>
            <Button className="button button--solid-orange" onClick={() => this.makePayment()}>Confirm Payment</Button>
          </Modal.Footer>
        </div>
      );
    } else {
      return (
        <div>
          <Modal.Body>
            <p>Please confirm that you would like to pay {teacher.first_name} {teacher.last_name} ${price} for this lesson.</p>
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

    return(
      <div>
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Pay Lesson</Modal.Title>
          </Modal.Header>
          {this.renderPayModal()}
        </Modal>
      </div>
    );
  }
}

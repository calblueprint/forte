class DonateModal extends React.Component {

  constructor() {
    super();
    this.state = {
      showNextScreen: false,
    };
  }

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func.isRequired,
    };
  }

  handleNext() {
    this.setState({ showNextScreen: true });
  }

  makePayment() {
    const { handleClose } = this.props;
    const price = 34;
    const resolve = (response) => { this.updateDonationPaid() };
    const reject = (response) => { console.log(response) };

    var stripePrice = priceToStripePrice(price);
    var params = {
      amount: stripePrice,
    };

    Requester.post(
      ApiConstants.stripe.charge,
      params,
      resolve,
      reject
    );
  }

  updateDonationPaid() {
    const { handleClose } = this.props;
    const resolve = (response) => {
      handleClose();
    };
    const reject = (response) => { console.log(response) };

    var params = {
      is_paid: true,
    };

    // Requester.update(
    //   ApiConstants.lessons.update(lesson.id),
    //   params,
    //   resolve,
    //   reject
    // );
  }

  renderDonateModal() {
    const { handleClose } = this.props;
    const { showNextScreen } = this.state
    const price = 34;
    if (showNextScreen) {
      return (
        <div>
          <Modal.Body>
            <p>
              We will charge ${price} on your credit card.
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
            <p>Please confirm that you would like to donate ${price}.</p>
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
            <Modal.Title>Make Donation</Modal.Title>
          </Modal.Header>
          {this.renderDonateModal()}
        </Modal>
      </div>
    );
  }
}

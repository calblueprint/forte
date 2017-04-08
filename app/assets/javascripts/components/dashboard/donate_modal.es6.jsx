class DonateModal extends React.Component {

  constructor() {
    super();
    this.state = {
      showNextScreen: false,
      donation_amount: null,
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

  handleChange(event) {
    var name = $(event.target).attr("name");
    var value = $(event.target).val();
    this.setState({ [name] : value });
  }

  renderDonateModal() {
    //on Done: send email to admin with donor info
    //look at contact_page send_contact_email
    //add method to static_pages_controller

    const { handleClose } = this.props;
    const { showNextScreen } = this.state;
    if (showNextScreen) {
      return (
        <div>
          <Modal.Body>
            Thank you for your donation!
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </div>
      );
    } else {
      return (
        <div>
          <Modal.Body>
            <ControlLabel>Full Name</ControlLabel>
            <FormControl
              componentClass="input"
              placeholder="Full Name"
              name="full_name"
              onChange={(event) => this.handleChange(event)}
              />
            <ControlLabel>Email</ControlLabel>
            <FormControl
              componentClass="input"
              placeholder="Email"
              name="email"
              onChange={(event) => this.handleChange(event)}
              />
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl
              componentClass="input"
              placeholder="Phone Number"
              name="phone_number"
              onChange={(event) => this.handleChange(event)}
              />
            <ControlLabel>Message (optional)</ControlLabel>
            <FormControl
              componentClass="input"
              placeholder="Message (optional)"
              name="message"
              onChange={(event) => this.handleChange(event)}
              />
            <ControlLabel>Donation Amount</ControlLabel>
            <FormControl
              componentClass="input"
              placeholder="Donation Amount"
              name="donation_amount"
              onChange={(event) => this.handleChange(event)}
              />
            <ControlLabel>Card Information</ControlLabel>
            <StripeElement></StripeElement>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Cancel</Button>
            <Button className="button button--solid-orange" onClick={() => this.handleNext()}>Done</Button>
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

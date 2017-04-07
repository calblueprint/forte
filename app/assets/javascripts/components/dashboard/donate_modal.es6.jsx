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

  makePayment() {
    var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    var elements = stripe.elements();
    // Custom styling can be passed to options when creating an Element.
    var style = {
      base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        lineHeight: '24px'
      }
    };

    // Create an instance of the card Element
    var card = elements.create('card', {style: style});
    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');

    card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Create a token or display an error the form is submitted.
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server
          stripeTokenHandler(result.token);
        }
      });
    });
  }

  stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    // Submit the form
    form.submit();
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
            {this.state.donation_amount}
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Close</Button>
            <Button className="button button--solid-orange" onClick={() => this.makePayment()}>Done</Button>
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
            <Button onClick={() => this.makePayment()}>Enter Payment Information</Button>
            <div id="card-element"></div>
            <div id="card-errors"></div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Close</Button>
            <Button className="button button--solid-orange" onClick={() => this.handleNext()}>Confirm Payment</Button>
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

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

  componentDidUpdate() {
    if (!this.state.showNextScreen) {
      const stripe = Stripe('pk_test_kWV5HAQuTjQRu7CRuQhDd1nj');
      this.stripe = stripe;
      const elements = stripe.elements();
      var style = {
        base: {
          fontSize: '16px',
          lineHeight: '24px'
        }
      };
      var card = elements.create('card', {style: style});
      this.card = card;
      card.mount('#card-element');

      card.addEventListener('change', function(event) {
      var displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });
    }
  }

  handleNext() {
    this.setState({ showNextScreen: true });
  }

  handleChange(event) {
    var name = $(event.target).attr("name");
    var value = $(event.target).val();
    console.log(value);
    this.setState({ [name] : value });
  }

  handleSubmit() {
    var state = this.state;

    this.stripe.createToken(this.card).then(function(result) {
      if (result.error) {
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        const resolve = (result) => { console.log(result) };
        const reject = (result) => { console.log(result) };
        var params = {
          amount: parseInt(state.donation_amount),
          stripe_token: result.token.id,
        };

        Requester.post(
          ApiConstants.stripe.donationCharge,
          params,
          resolve,
          reject,
        );
      }
    });
    // this.handleNext();
    this.emailAdmin();

    //on Done: send email to admin with donor info
  }

  emailAdmin() {
    //call donation_notify admin
    console.log("email admin");
  }

  renderDonateModal() {
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
            <Radio
              name="donation_amount"
              value={10}
              onChange={(event) => this.handleChange(event)}>
              $10.00 (Mezzoforte)
            </Radio>
            <Radio
              name="donation_amount"
              value={25}
              onChange={(event) => this.handleChange(event)}>
              $25.00 (Forte)
            </Radio>
            <Radio
              name="donation_amount"
              value={50}
              onChange={(event) => this.handleChange(event)}>
               $50.00 (Fortissimo)
            </Radio>
            <Radio
              name="donation_amount"
              value={100}
              onChange={(event) => this.handleChange(event)}>
               $100.00 (Fortississimo)
            </Radio>
            <Radio
              name="donation_amount"
              value={"other"}
              onChange={(event) => this.handleChange(event)}>
               Other
               <FormControl
                componentClass="input"
                placeholder="Other amount"
                name="donation_amount"
                onChange={(event) => this.handleChange(event)}
                />
            </Radio>

            <ControlLabel>Card Information</ControlLabel>
            <form id="payment-form">
              <div id="card-element"></div>
              <div id="card-errors"></div>
              <Modal.Footer>
              <Button className="button button--outline-orange" onClick={handleClose}>Cancel</Button>
              <Button onClick={() => this.handleSubmit()} className="button button--solid-orange">Confirm Payment</Button>
            </Modal.Footer>
            </form>

          </Modal.Body>
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

class DonateModal extends React.Component {

  constructor() {
    super();
    this.state = {
      donation_amount: null,
      showNextScreen: false,
      full_name: null,
      email: null,
      phone_number: null,
      message: null,
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

  handleChange(event) {
    var name = $(event.target).attr("name");
    var value = $(event.target).val();
    // if (name === "custom_donation_amount") {
    //   this.setState({ donation_amount: value});
    // }
    this.setState({ [name] : value });
  }

  addRedBorder(input) {
    input.parentNode.classList.add("blank");
    input.classList.add("red-border");
  }

  removeRedBorder(input) {
    input.parentNode.classList.remove("blank");
    input.classList.remove("red-border");
  }

  handleNext() {
    this.setState({ showNextScreen: true });
  }

  handleSubmit() {
    var validated = this.validateFields();
    if (validated) {
      this.stripe.createToken(this.card).then(this.createCharge.bind(this));
    }
  }

  createCharge(result) {
    var state = this.state;
     if (result.error) {
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      const resolve = (result) => { this.emailAdmin() };
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
  }

  validateFields() {
    var validated = true;
    var keys = Object.keys(this.state);
    for (key of keys) {
      if (!this.state[key] || (this.state[key] === "other" && key === "donation_amount")) {
        if (key != "message" && key != "showNextScreen") {
          validated = false;
          if (key === "donation_amount") {
            this.addRedBorder(document.getElementsByName(key)[4]);
          } else {
            this.addRedBorder(document.getElementsByName(key)[0]);
          }
        }
      } else {
        if (document.getElementsByName(key).length) {
          validated = true;
          if (key === "donation_amount") {
            this.removeRedBorder(document.getElementsByName(key)[4]);
          } else {
            this.removeRedBorder(document.getElementsByName(key)[0]);
          }
        }
      }
    }
    return validated;
  }

  emailAdmin() {
    const resolve = (result) => { console.log(result) };
    const reject = (result) => { console.log(result) };
    var params = {
      full_name: this.state.full_name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      message: this.state.message,
    };

    Requester.post(
      ApiConstants.donations.donationNotify,
      params,
      resolve,
      reject,
    );
    this.handleNext();
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
          <div className="form-row">
            <FormGroup>
              <ControlLabel>Full Name</ControlLabel>
              <FormControl
                componentClass="input"
                placeholder="Full Name"
                name="full_name"
                onChange={(event) => this.handleChange(event)}
                />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                componentClass="input"
                placeholder="Email"
                name="email"
                onChange={(event) => this.handleChange(event)}
                />
            </FormGroup>
          </div>

          <div className="form-row">
            <FormatInput
                formName        = "Phone Number"
                inputId         = "phone_number"
                handleChange    = { (event) => this.handleChange(event) }
                validationState = { () => {} }
                displayErrors   = { () => {} } />

            <FormGroup>
              <ControlLabel>Message (optional)</ControlLabel>
              <FormControl
                componentClass="input"
                placeholder="Message (optional)"
                name="message"
                onChange={(event) => this.handleChange(event)}
                />
            </FormGroup>
          </div>

            <FormGroup>
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
                 <FormControl
                  componentClass="input"
                  type="number"
                  min="0"
                  placeholder="Other amount"
                  name="donation_amount"
                  onChange={(event) => this.handleChange(event)}
                  />
              </Radio>
            </FormGroup>

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
            <Modal.Title>Forte Donation</Modal.Title>
          </Modal.Header>
          {this.renderDonateModal()}
        </Modal>
      </div>
    );
  }
}

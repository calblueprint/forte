class StripeElement extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.createStripeElement();
  }

  createStripeElement() {
    var stripe = Stripe('pk_test_kWV5HAQuTjQRu7CRuQhDd1nj');
    var elements = stripe.elements();
    var style = {
      base: {
        fontSize: '16px',
        lineHeight: '24px'
      }
    };

    // Create an instance of the card Element
    var card = elements.create('card', {style: style});
    card.mount('#card-element');

    card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Create a token or display an error
    var form = document.getElementById('payment-form');

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          const resolve = (result) => { console.log(result) };
          const reject = (result) => { console.log(result) };
          console.log(this.props.donationAmount);
          var params = {
            amount: this.props.donationAmount,
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
    });
  }

  render() {
    return (
      <form id="payment-form">
        <div id="card-element"></div>
        <div id="card-errors"></div>
        <Button type="submit">Submit Donation</Button>
      </form>
    );
  }
}

StripeElement.propTypes = {
  donationAmount : React.PropTypes.string.isRequired,
};

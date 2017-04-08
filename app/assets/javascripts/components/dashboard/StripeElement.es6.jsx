class StripeElement extends React.Component {

  static get propTypes() {
    return {
    };
  }

  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    this.createStripeElement();
    // this.stripeTokenHandler();
  }

  createStripeElement() {
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
          var form = document.getElementById('payment-form');
          var hiddenInput = document.createElement('input');
          hiddenInput.setAttribute('type', 'hidden');
          hiddenInput.setAttribute('name', 'stripeToken');
          hiddenInput.setAttribute('value', result.token.id);
          form.appendChild(hiddenInput);
          // Submit the form
          form.submit();
        }
      });
    });
  }

  render() {
    return (
      <form action="#" method="post" id="payment-form">
        <div id="card-element"></div>
        <div id="card-errors"></div>
        <Button type="submit">Submit Donation</Button>
      </form>
    );
  }
}

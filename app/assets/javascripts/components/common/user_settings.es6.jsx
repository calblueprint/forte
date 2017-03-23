class UserSettings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange(event) {
    let target = $(event.target);
    let val = target.val();

    if (target.attr('name') == 'birthday') {
      val = moment(val);
    }

    this.setState({ [target.attr('name')] : val });
  }

  attemptSave(resolve, reject) {
    let status;

    const route = ApiConstants.students.update(this.props.id);
    const params = this.state;
    const success = resolve;
    const fail = reject;

    Requester.update(
        route,
        params,
        success,
        fail
    );
  }

  attemptCardSave(resolve, reject) {
    this.setState({ editable: false });
    this.updateStripeCustomer(resolve, reject);
  }

  async updateStripeCustomer(resolve, reject) {
    const {
      card_number,
      cvc,
      exp_month,
      exp_year,
      cardholder_name,
      stripe_address_line1,
      stripe_address_line2,
      stripe_address_city,
      stripe_address_state,
      stripe_address_zip,
    } = this.state;

    Stripe.card.createToken({
      number: card_number,
      cvc: cvc,
      exp_month: exp_month,
      exp_year: exp_year,
      name: cardholder_name,
      address_line1: stripe_address_line1,
      address_line2: stripe_address_line2,
      address_city: stripe_address_city,
      address_state: stripe_address_state,
      address_zip: stripe_address_zip
    }, this.stripeResponseHandler.bind(this, resolve, reject));
  }

  stripeResponseHandler(success, fail, status, response) {
    const reject = (response) => {
      console.log(response);
      fail();
    };

    const resolve = ((response) => {
      console.log(response);
      success();
    });

    if (response.error) {
      console.log(response.error);
    } else {
      var params = {
        stripe_token: response.id,
        email: this.state.email,
        customer_id: this.state.person.customer_id
      };
      console.log(params);
      Requester.post(
        ApiConstants.stripe.updateCustomer,
        params,
        resolve,
        reject
      );
    }
  }
}

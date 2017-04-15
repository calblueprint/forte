class UserSettings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange(event) {
    let target = $(event.target);
    let val = target.val();

    if (target.attr('name') == 'birthday' || target.attr('name') == 'stripe_account_holder_dob') {
      val = moment(val);
    }
    this.setState({ [target.attr("name")] : val });
  }

  handleIntegerChange(event) {
    let name = $(event.target).attr("name");
    if (name === "teacher_school_level") {
      name = "school_level";
    }
    var value = $(event.target).val();
    value = parseInt(value);
    this.setState({ [name] : value });
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

  attemptTeacherSave(resolve, reject) {
    let status;

    const route = ApiConstants.teachers.update(this.props.id);
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

  updateStudentPassword(resolve, reject, student_id) {

    const route = ApiConstants.authentication.update_password.student(student_id);
    const params = {
      student: this.state,
    };

    Requester.update(
        route,
        params,
        resolve,
        reject
    );
  }

  updateTeacherPassword(resolve, reject, teacher_id) {

    const route = ApiConstants.authentication.update_password.teacher(teacher_id);
    const params = {
      teacher: this.state,
    };

    Requester.update(
        route,
        params,
        resolve,
        reject
    );
  }

  attemptCardSave(resolve, reject) {
    this.setState({ editable: false });
    this.updateStripeCustomer(resolve, reject);
  }

  stripeValidateFields() {
    const { card_number, exp_month, exp_year, cvc } = this.state;

    var card_errs = {};

    var num_err = Stripe.card.validateCardNumber(card_number);
    var expiry_err = Stripe.card.validateExpiry(exp_month, exp_year);
    var cvc_err = Stripe.card.validateCVC(cvc);

    card_errs.stripe_address_line1 = [this.state.stripe_address_line1, "Can't be blank"];
    card_errs.stripe_address_city = [this.state.stripe_address_city, "Can't be blank"];
    card_errs.stripe_address_zip = [this.state.stripe_address_zip, "Can't be blank"];
    card_errs.card_number = [num_err, "Please enter a valid card number"];
    card_errs.exp_month = [expiry_err, "Please enter a valid expiration date"];
    card_errs.cvc = [cvc_err, "Please enter a valid cvc number"];

    var validated = true;
    var error_info = {};
    for (var err_type in card_errs) {
      if (!card_errs[err_type][0]) {
        validated = false;
        error_info[err_type] = card_errs[err_type][1];
      }
    }
    this.setState({errors: error_info});
    return validated;
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

    var validated_stripe = await this.stripeValidateFields();

    if (validated_stripe) {
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
    } else {
      toastr.error("There are errors with your form! <br> Please correct them before continuing!");
    }
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
      Requester.post(
        ApiConstants.stripe.updateCustomer,
        params,
        resolve,
        reject
      );
    }
  }

  attemptStripeAccountSave(resolve, reject) {
    this.setState({ editable: false });
    this.updateStripeAccount(resolve, reject);
  }

  stripeValidateTeacherFields(stripe_routing_number, stripe_account_number, stripe_country) {

    var routing_num_err = Stripe.bankAccount.validateRoutingNumber(stripe_routing_number, stripe_country);
    var account_num_err = Stripe.bankAccount.validateAccountNumber(stripe_account_number, stripe_country);

    var routing_num_err_msg = (routing_num_err && !stripe_country) ? "Please make sure Bank Account Country is not blank" :  "Please enter a valid routing number";
    var account_num_err_msg = (account_num_err && !stripe_country) ? "Please make sure Bank Account Country is not blank" : "Please enter a valid account number";

    if (!stripe_country) {
      routing_num_err = false;
      account_num_err = false;
    }

    var payment_errs = {};

    payment_errs.stripe_account_holder_name = [this.state.stripe_account_holder_name, "Can't be blank"];
    payment_errs.stripe_account_holder_type = [this.state.stripe_account_holder_type, "Can't be blank"];
    payment_errs.stripe_account_holder_dob = [this.state.stripe_account_holder_dob, "Can't be blank"];
    payment_errs.stripe_address_line1 = [this.state.stripe_address_line1, "Can't be blank"];
    payment_errs.stripe_address_city = [this.state.stripe_address_city, "Can't be blank"];
    payment_errs.stripe_address_state = [this.state.stripe_address_state, "Can't be blank"];
    payment_errs.stripe_address_postal_code = [this.state.stripe_address_postal_code, "Can't be blank"];
    payment_errs.stripe_ssn_last_4 = [this.state.stripe_ssn_last_4, "Can't be blank"];
    payment_errs.stripe_country = [this.state.stripe_country, "Can't be blank"];
    payment_errs.stripe_routing_number = [routing_num_err, routing_num_err_msg];
    payment_errs.stripe_account_number = [account_num_err, account_num_err_msg];

    var error_info = {};
    var validated = true;
    for (var err_type in payment_errs) {
      if (!payment_errs[err_type][0]) {
        validated = false;
        error_info[err_type] = payment_errs[err_type][1];
      }
    }
    this.setState({errors: error_info});
    return validated;
  }

  async updateStripeAccount(resolve, reject) {
    const {
      stripe_country,
      stripe_routing_number,
      stripe_account_number,
      stripe_account_holder_name,
      stripe_account_holder_type
    } = this.state;

    var validate_stripe_response = await this.stripeValidateTeacherFields(stripe_routing_number, stripe_account_number, stripe_country);

    if (validate_stripe_response) {
      Stripe.bankAccount.createToken({
        country: stripe_country,
        currency: 'USD',
        routing_number: stripe_routing_number,
        account_number: stripe_account_number,
        account_holder_name: stripe_account_holder_name,
        account_holder_type: stripe_account_holder_type,
      }, this.stripeAccountResponseHandler.bind(this, resolve, reject));
    } else {
      toastr.error("There are errors with your form! <br> Please correct them before continuing!");
    }
  }

  stripeAccountResponseHandler(success, fail, status, response) {
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
        email: this.props.person.email,
        country: "US",
        account_id: this.props.person.account_id,
        bank_id: this.props.person.bank_id,
        teacher_id: this.props.id,
      };
      Requester.post(
        ApiConstants.stripe.changeAccount,
        params,
        resolve,
        reject
      );
    }
  }
}

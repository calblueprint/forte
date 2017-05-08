class UserSettings extends BaseUserComponent {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  /**
   * Handles change of birthday field
   * @param event Object on change event
   */
  handleBirthdayChange(event) {
    var name = $(event.target).attr("name");
    var val = moment($(event.target).val());
    this.setState({ [name] : val });
  }

  /**
   * Handles change of dropdown fields
   * @param event Object on change event
   */
  handleIntegerChange(event) {
    let name = $(event.target).attr("name");
    if (name === "teacher_school_level") {
      name = "school_level";
    }
    var value = $(event.target).val();
    value = parseInt(value);
    this.setState({ [name] : value });
  }

  /**
   * Attempts to save changes and update student
   * @param resolve Object
   * @param reject Object
   */
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

  /**
   * Attempts to save changes and update teacher
   * @param resolve Object
   * @param reject Object
   */
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

  /**
   * Handles update student password
   * @param resolve Object
   * @param reject Object
   * @param student_id String id of the student to be updated
   */
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

  /**
   * Handles update teacher password
   * @param resolve Object
   * @param reject Object
   * @param teacher_id String id of the teacher to be updated
   */
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

  /**
   * Attempts to save changes and update student payment information
   * @param resolve Object
   * @param reject Object
   */
  attemptCardSave(resolve, reject) {
    this.setState({ editable: false });
    this.updateStripeCustomer(resolve, reject);
  }

  /**
   * Stripe validations for student payment information
   */
  stripeValidateFields() {
    const { card_number, exp_month, exp_year, cvc } = this.state;

    var card_errs = {};

    var num_err = Stripe.card.validateCardNumber(card_number);
    var expiry_err = Stripe.card.validateExpiry(exp_month, exp_year);
    var cvc_err = Stripe.card.validateCVC(cvc);

    card_errs.stripe_address = [this.state.stripe_address, "Can't be blank"];
    card_errs.stripe_city = [this.state.stripe_city, "Can't be blank"];
    card_errs.stripe_state = [this.state.stripe_state, "Can't be blank"];
    card_errs.stripe_zipcode = [this.state.stripe_zipcode, "Can't be blank"];
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

  /**
   * Attempts to save address
   * @param resolve Object
   * @param reject Object
   */
  attemptAddressSave(resolve, reject) {
    this.setState({ editable: false });
    this.validateAddress(resolve, reject);
  }

  /**
   * Validate address fields
   * @param resolve Object
   * @param reject Object
   */
  validateAddress(resolve, reject) {
    const { lat, lng, address, address2, city, state, zipcode } = this.state;

    if (address || address2 || city || state || zipcode) {

      var address_errs = {};
      var error_info = {};
      var validated = true;

      address_errs.address = [address, "Can't be blank"];
      address_errs.city = [city, "Can't be blank"];
      address_errs.state = [state, "Can't be blank"];
      address_errs.zipcode = [zipcode, "Please enter a valid card number"];
      for (var err_type in address_errs) {
        if (!address_errs[err_type][0]) {
            validated = false;
            error_info[err_type] = address_errs[err_type][1];
        }
      }

      if (!validated) {
        this.setState({errors: error_info});
        toastr.error("There are errors with your form! <br> Please correct them before continuing!");
        return;
       }

      if (!lat && !lng) {
        var geocoder = new google.maps.Geocoder();
        var full_address = [address, address2, city, state, zipcode].join(" ");
        geocoder.geocode({"address": full_address}, function(results, status) {
          if (status === 'OK') {
            var location = results[0]["geometry"]["location"];
            var lat = location["lat"]();
            var lng = location["lng"]();
            this.setState({ lat: lat, lng: lng });
            this.attemptSave(resolve, reject);
          } else {
            error_info.address = "Invalid address";
            this.setState({errors: error_info});
            toastr.error("There are errors with your form! <br> Please correct them before continuing!");
          }
        }.bind(this));
      } else {
        this.attemptSave(resolve, reject);
      }
    } else {
      this.attemptSave(resolve, reject);
    }
  }

  /**
   * Attempts to update Stripe Customer associated with student
   * @param resolve Object
   * @param reject Object
   */
  async updateStripeCustomer(resolve, reject) {
    const {
      card_number,
      cvc,
      exp_month,
      exp_year,
      cardholder_name,
      stripe_address,
      stripe_address2,
      stripe_city,
      stripe_state,
      stripe_zipcode,
    } = this.state;

    var validated_stripe = await this.stripeValidateFields();

    if (validated_stripe) {
      Stripe.card.createToken({
        number: card_number,
        cvc: cvc,
        exp_month: exp_month,
        exp_year: exp_year,
        name: cardholder_name,
        address_line1: stripe_address,
        address_line2: stripe_address2,
        address_city: stripe_city,
        address_state: stripe_state,
        address_zip: stripe_zipcode
      }, this.stripeResponseHandler.bind(this, resolve, reject));
    } else {
      toastr.error("There are errors with your form! <br> Please correct them before continuing!");
    }
  }

  /**
   * Handles Stripe response
   * @param success Object
   * @param fail Object
   * @param status Object
   * @param response Object
   */
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

  /**
   * Attempts to save changes to Stripe Account associated with teacher
   * @param resolve Object
   * @param reject Object
   */
  attemptStripeAccountSave(resolve, reject) {
    this.setState({ editable: false });
    this.updateStripeAccount(resolve, reject);
  }

  /**
   * Stripe validations for teacher bank account information
   * @param stripe_routing_number String routing number to be validated
   * @param stripe_account_numer String account number to be validated
   * @param stripe_country String country to be validated
   */
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
    payment_errs.stripe_address = [this.state.stripe_address, "Can't be blank"];
    payment_errs.stripe_city = [this.state.stripe_city, "Can't be blank"];
    payment_errs.stripe_state = [this.state.stripe_state, "Can't be blank"];
    payment_errs.stripe_zipcode = [this.state.stripe_zipcode, "Can't be blank"];
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

  /**
   * Update Stripe Account associated with teacher
   * @param resolve Object
   * @param reject Object
   */
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

  /**
   * Stripe response handler for Stripe Account
   * @param success Object
   * @param fail Object
   * @param status Object
   * @param response Object
   */
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

  openRemoveModal() { this.setState({ removeModalIsVisible: true }); }

  closeRemoveModal() { this.setState({ removeModalIsVisible: false }); }

  openAddModal() { this.setState({ addModalIsVisible: true }); }

  closeAddModal() { this.setState({ addModalIsVisible: false }); }

  /**
   * Renders modal to remove an instrument
   * @param instrument Object instrument to be removed
   */
  renderRemoveModal(instrument) {
    const { removeModalIsVisible } = this.state;

    if (removeModalIsVisible) {
      return (
        <RemoveInstrumentModal
          isVisible={removeModalIsVisible}
          handleClose={() => this.closeRemoveModal()}
          fetchInstruments={() => this.fetchInstruments()}
          instrument={instrument}
        />
      );
    }
  }

  /**
   * Renders modal to add an instrument
   */
  renderAddModal() {
    const { addModalIsVisible } = this.state;
    const { instruments } = this.state.person;
    const { person } = this.props;

    if (addModalIsVisible) {
      return (
        <AddInstrumentModal
          isVisible={addModalIsVisible}
          handleClose={() => this.closeAddModal()}
          fetchInstruments={() => this.fetchInstruments()}
          instruments={instruments}
          instrumentable={person}
        />
      )
    }
  }

  /**
   * Renders instrument
   * @param instrument Object instrument to be rendered
   */
  renderInstrument(instrument) {
    return (
      <div className="instrument">
        <div className="instrumentName">
          {instrument.name}
        </div>
        <a className="link"
          onClick={() => this.openRemoveModal()}>
          [Remove]
        </a>
        {this.renderRemoveModal(instrument)}
      </div>
    );
  }

  /**
   * Renders all instruments for the person
   */
  renderInstruments() {
    const { instruments } = this.state.person;
    if (instruments) {
      return instruments.map((instrument) => this.renderInstrument(instrument));
    }
  }
}

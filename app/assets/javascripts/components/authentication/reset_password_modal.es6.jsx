/**
 * Component to reset password
 * @prop type        - Specifying account type: student, teacher, or admin
 * @prop handleClose - Function to handling the closing of this modal
 */

class ResetPasswordModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: null,
    };
  }

  static get propTypes() {
    return {
      type: React.PropTypes.string,
      handleClose: React.PropTypes.func,
    };
  }

  /**
   * Given the email and account type, tries to send an email with a generated
   * secret token that allows users to reset their passwords. If resetting was
   * successful, a success message will pop up and they will be redirected to the
   * home page. Else, an error message will pop up.
   */
  resetPassword() {
    const { handleClose } = this.props;
    var reject = (response) => {
      this.setState({ error: response.message })
    };
    var params = {
      email: this.state.email
    };


    if (this.props.type == 'student') {
      var route = ApiConstants.authentication.request_reset_password.student;
      var resolve = (response) => {
        toastr.success("Email has been sent to reset password!");
        handleClose();
      };
    } else if (this.props.type == 'teacher') {
      var route = ApiConstants.authentication.request_reset_password.teacher;
      var resolve = (response) => {
        toastr.success("Email has been sent to reset password!");
        handleClose();
      };
    } else if (this.props.type == 'admin') {
      var route = ApiConstants.authentication.request_reset_password.admin;
      var resolve = (response) => {
        toastr.success("Email has been sent to reset password!");
        handleClose();
      };
    }

    Requester.post(
      route,
      params,
      resolve,
      reject,
    );
  }

  handleChange(event) {
    this.setState({ [$(event.target).attr("name")] : $(event.target).val() });
  }

  handleEnter(event) {
    if (event.keyCode == 13 || event.which == 13) {
      this.resetPassword()
    }
  }

  /**
   * Checks to see if there are any errors from any actions taken on this page.
   * If so, this function will render and display them.
   */
  renderError() {
    const { error } = this.state;
    if (error) {
      return (
        <Alert bsStyle="danger">
          {error}
        </Alert>
      )
    };
  }

  render () {
    return(

      <Modal show={true} onHide={this.props.handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Reset Your Password</Modal.Title>
        </Modal.Header>
        {this.renderError()}
        <Modal.Body>
            <FormGroup className="reset-password__field">
              <FormControl
                componentClass="input"
                type="text"
                name="email"
                placeholder="Email Address"
                onChange={(e) => this.handleChange(e)}
                onKeyDown={(e) => this.handleEnter(e.nativeEvent)} />
            </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="button--solid-orange"
            onClick={() => this.resetPassword()}>Send Password Reset Email</Button>
        </Modal.Footer>
      </Modal>
    );
  }

}
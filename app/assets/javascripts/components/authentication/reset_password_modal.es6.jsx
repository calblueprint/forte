class ResetPasswordModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
    };
  }

  static get propTypes() {
    return {
      type: React.PropTypes.string,
      handleClose: React.PropTypes.func,
    };
  }

  resetPassword() {
    var reject = (response) => {
      this.setState({ error: response.message })
    };
    var params = {
      email: this.state.email
    };


    if (this.props.type == 'student') {
      var route = ApiConstants.authentication.request_reset_password.student;
      var resolve = (response) => { console.log(response); };
    } else if (this.props.type == 'teacher') {
      var route = ApiConstants.authentication.request_reset_password.teacher;
      var resolve = (response) => { console.log(response); };
    } else if (this.props.type == 'admin') {
      var route = ApiConstants.authentication.request_reset_password.admin;
      var resolve = (response) => { console.log(response); };
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

  renderError() {
    const { error } = this.state;
    if (error != '') {
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
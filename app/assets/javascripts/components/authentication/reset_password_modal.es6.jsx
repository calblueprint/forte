class ResetPasswordModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      email: '', 
      errors: '',
    };
  }

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func,
    };
  }

  // WIP: Need to set route and resolve links
  resetPassword() {
    var reject = (response) => this.setState({ errors: response.error }); // why is this one just error?
    var paramsObject = {
      email: this.state.email,
    };
    
    if (this.props.type == 'student') {
      var params = { student: paramsObject };
      // var route = ApiConstants.authentication.reset_password.student;
      // var resolve = (response) => { window.location.href = "/student/reset_password"; };
    } else if (this.props.type == 'teacher') {
      var params = { teacher: paramsObject };
      // var route = ApiConstants.authentication.reset_password.teacher;
      // var resolve = (response) => { window.location.href = "/teacher/reset_password"; };
    } else if (this.props.type == 'admin') {
      var params = { admin: paramsObject };
      // var route = ApiConstants.authentication.reset_password.admin;
      // var resolve = (response) => { window.location.href = "/admin/reset_password"; };
    }
  
    Requester.post(
      route,
      params,
      resolve,
      reject,
    );
  }

  render () {
    return(

      <Modal show={true} onHide={this.props.handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Reset Your Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>    
            <FormGroup className="reset-password__field">
              <FormControl
                componentClass="input"
                type="text"
                name="email"
                placeholder="Email Address"
                onChange={(event) => this.handleChange(event)} />
            </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          // <Button className="button--solid-orange" onClick={this.resetPassword()}>Send Password Reset Email</Button>
          <Button className="button--solid-orange" onClick={this.props.handleClose()}>Send Password Reset Email</Button>
        </Modal.Footer>
      </Modal>
    );
  }

}
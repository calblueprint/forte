class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: '',
      showAlert: false,
      resetPasswordModal: false,
     };
  }

  componentDidMount() {
    this.autofocus.focus();
  }

  handleChange(event) {
    this.setState({ [$(event.target).attr("name")] : $(event.target).val() });
  }

  handleEnter(event) {
    if (event.keyCode == 13 || event.which == 13) {
      this.login()
    }
  }

  /** 
   * Given the account type (i.e. student, teacher, or admin), their email, and their
   * password, tries to log in with their account credentials. If login was successful,
   * reroutes user to their respective home pages. Else, an error message will pop up.
   */
  login() {
    var reject = (response) => this.setState({ errors: response.error });
    var paramsObject = {
      email: this.state.email,
      password: this.state.password,
      remember_me: 1
    };
    
    if (this.props.type == 'student') {
      var params = { student: paramsObject };
      var route = ApiConstants.authentication.login.student;
      var resolve = (response) => { window.location.href = "/student/lessons"; };
    } else if (this.props.type == 'teacher') {
      var params = { teacher: paramsObject };
      var route = ApiConstants.authentication.login.teacher;
      var resolve = (response) => { window.location.href = "/teacher/lessons"; };
    } else if (this.props.type == 'admin') {
      var params = { admin: paramsObject };
      var route = ApiConstants.authentication.login.admin;
      var resolve = (response) => { window.location.href = "/admin/unmatched"; };
    }
  
    Requester.post(
      route,
      params,
      resolve,
      reject,
    );
  }

  /**
   * Checks to see if there are any errors from any actions taken on this page.
   * If so, this function will render and display them.
   */
  renderErrors() {
    const { errors } = this.state;
    if (errors != '') {
      return (
        <Alert bsStyle="danger">
          {errors}
        </Alert>
      )
    };
  }

  // Intermediary step to opening the reset password modal
  openResetPassword() {
    this.setState({ resetPasswordModal: true });
  }

  // Intermediary step to closeing the reset password modal
  closeResetPassword() {
    this.setState( { resetPasswordModal: false });
  }

  /** 
   * If openResetPassword is triggered, this renders the modal to allow users to reset
   * their passwords.
   */
  renderResetPasswordModal() {
    const { resetPasswordModal } = this.state;
    if (resetPasswordModal) {
      return ( 
        <ResetPasswordModal type = {this.props.type}
                     handleClose = {() => this.closeResetPassword() } />
      );
    }
  }

  render () {
    if (this.props.type == 'student') {
      var typeText = 'Student';
    } else if (this.props.type == 'teacher') {
      var typeText = 'Teacher';
    } else if (this.props.type == 'admin') {
      var typeText = 'Admin';
    }

    return (
      <div className="page-wrapper">
        <Header />
        <div className="content-wrapper login-page">
          <form className="login-card">
            <h2 className="login-card__header">{typeText} Login</h2>
            <FormGroup className="login-card__field">
              {this.renderErrors()}
              <ControlLabel>Email</ControlLabel>
              <input
                className="form-control"
                type="text"
                name="email"
                ref={(ref) => { this.autofocus = ref; }}
                onChange={(e) => this.handleChange(e)}
                onKeyDown={(e) => this.handleEnter(e.nativeEvent)} />
            </FormGroup>
            <FormGroup className="login-card__field">
              <ControlLabel>Password</ControlLabel>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={(e) => this.handleChange(e)}
                onKeyDown={(e) => this.handleEnter(e.nativeEvent)} />
            </FormGroup>

            <div className="login-buttons">
              <Button
                className="login-card__reset-password"
                onClick={() => this.openResetPassword()}>Forgot Password</Button>
              {this.renderResetPasswordModal()}
              <Button
                className="button button--solid-orange login-card__button"
                onClick={() => this.login()}>Log In</Button> 
            </div>

          </form>
        </div>
        <Footer />
      </div>
    )
  }
}

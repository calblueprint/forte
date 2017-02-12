class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: '',
      showAlert: false,
     };
  }

  handleChange(event) {
    this.setState({ [$(event.target).attr("name")] : $(event.target).val() });
  }

  handleEnter(event) {
    if (event.keyCode == 13 || event.which == 13) {
      this.login()
    }
  }

  login() {
    var reject = (response) => this.setState({ errors: response.error }); // why is this one just error?
    var paramsObject = {
      email: this.state.email,
      password: this.state.password,
      remember_me: 1
    };
    if (this.props.type == 'student') {
      var params = { student: paramsObject };
      var route = ApiConstants.authentication.login.student;
      var resolve = (response) => { window.location.href = "/student/lessons";
    };
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
              <FormControl
                componentClass="input"
                type="text"
                name="email"
                onChange={(e) => this.handleChange(e)}
                onKeyDown={(e) => this.handleEnter(e.nativeEvent)} />
            </FormGroup>
            <FormGroup className="login-card__field">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                componentClass="input"
                type="password"
                name="password"
                onChange={(e) => this.handleChange(e)}
                onKeyDown={(e) => this.handleEnter(e.nativeEvent)} />
            </FormGroup>
            <Button
              className="button button--solid-orange login-card__button"
              onClick={() => this.login()}>LOG IN</Button>
          </form>
        </div>
        <Footer />
      </div>
    )
  }
}

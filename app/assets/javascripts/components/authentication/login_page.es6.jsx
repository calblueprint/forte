class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [$(event.target).attr("name")] : $(event.target).val() });
  }

  login() {
    var reject = (response) => console.log(response);
    var paramsObject = {
      email: this.state.email,
      password: this.state.password,
      remember_me: 1
    };
    if (this.props.type == 'student') {
      var params = { student: paramsObject };
      var route = RouteConstants.authentication.login.student;
      var resolve = (response) => { window.location.href = "/"; };
    } else if (this.props.type == 'teacher') {
      var params = { teacher: paramsObject };
      var route = RouteConstants.authentication.login.teacher;
      var resolve = (response) => { window.location.href = "/"; };
    } else if (this.props.type == 'admin') {
      var params = { admin: paramsObject };
      var route = RouteConstants.authentication.login.admin;
      var resolve = (response) => { window.location.href = "/admin/matched"; };
    }
    Requester.post(
      route,
      params,
      resolve,
      reject,
    );
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
        <form>
          <div className="login-card">
            <h2 className="login-card__header">{typeText} Login</h2>
            <FormGroup className="login-card__field">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                name="email"
                onChange={(event) => this.handleChange(event)} />
            </FormGroup>
            <FormGroup className="login-card__field">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="text"
                name="password" 
                onChange={(event) => this.handleChange(event)} />
            </FormGroup>
            <Button className="button button--solid-orange login-card__button" onClick={() => this.login()}>LOG IN</Button> 
          </div>
        </form>
      </div>
    </div>
    )
  }
}

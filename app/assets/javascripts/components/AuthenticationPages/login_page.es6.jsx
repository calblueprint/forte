class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: '', password: ''}
  }

  handleChange(event) {
    this.setState({ [$(event.target).attr("name")] : $(event.target).val() });
  }

  login() {
    var reject = (response) => console.log(response);
    var resolve = (response) => {
      window.location.href = "/";
    }
    var params = {
      student: {
        email: this.state.email,
        password: this.state.password,
        remember_me: 1
      },
    }

    Requester.post(
      RouteConstants.authentication.login.student,
      params,
      resolve,
      reject,
    );
  }

  render () {
    return (
    <div>
      <form>
      <FormGroup>
        <ControlLabel>Email</ControlLabel>
        <FormControl
          type="text"
          name="email"
          onChange={(event) => this.handleChange(event)} />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Password</ControlLabel>
        <FormControl
          type="text"
          name="password" 
          onChange={(event) => this.handleChange(event)} />
      </FormGroup>
      <Button className="button button--solid-orange" onClick={() => this.login()}>SUBMIT</Button> 
      </form>
    </div>
    )
  }
}


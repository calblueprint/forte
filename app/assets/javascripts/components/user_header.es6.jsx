class UserHeader extends React.Component {

  constructor() {
    super();
    this.state = {
      signed_in_type: getCookie('signed_in_type'),
    };
  }

  logout() {
    const { signed_in_type } = this.state;
    const resolve = (response) => window.location = "/";
    const reject = (response) => console.log(response);
    if (signed_in_type == 'student') {
      var route = ApiConstants.authentication.logout.student;
    } else if (signed_in_type == 'teacher') {
      var route = ApiConstants.authentication.logout.teacher;
    }
    Requester.delete(
      route,
      resolve,
      reject,
    );
  }

  renderSettings() {
    const { signed_in_type } = this.state;
    if (signed_in_type == 'student') {
      return (
        <MenuItem href={RouteConstants.student.settings}>SETTINGS</MenuItem>
      );
    } else if (signed_in_type == 'teacher') {
      return (
        <MenuItem href={RouteConstants.student.settings}>SETTINGS</MenuItem>
      );
    }
  }

  renderLinks() {
    const { signed_in_type } = this.state;
    if (signed_in_type == 'student') {
      return (
        <Nav
          pullRight
          className="link-container">
          <NavItem href={RouteConstants.student.lessons}>My Lessons</NavItem>
          <NavItem href={RouteConstants.student.profile}>Profile</NavItem>
        </Nav>
      );
    } else if (signed_in_type == 'teacher') {
      // TODO: Add when RouteConstants for teachers is finished.
      return (
        <Nav
          pullRight
          className="link-container">
          <NavItem href={RouteConstants.teacher.lessons}>My Lessons</NavItem>
          <NavItem href={RouteConstants.teacher.profile}>Profile</NavItem>
        </Nav>
      );
    }
  }

  render () {
    var name = getCookie('name');

    return (
    <div>
      <Navbar
        fixedTop={true}
        className="user-header">
        <Navbar.Header>
            <Navbar.Brand>
              <a className="user-header__logo" href="/">
                <img src={ImageConstants.logos.white} />
              </a>
            </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown title={"Welcome,  " + name}>
              {this.renderSettings()}
              <MenuItem onClick={() => this.logout()}>LOG OUT</MenuItem>
            </NavDropdown>
          </Nav>
          {this.renderLinks()}
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

class UserHeader extends React.Component {

  logout() {
    var signed_in_type = getCookie('signed_in_type');
    var resolve = (response) => window.location = "/";
    var reject = (response) => console.log(response);
    if (signed_in_type == 'student') {
      var route = RouteConstants.authentication.logout.student;
    } else if (signed_in_type == 'teacher') {
      var route = RouteConstants.authentication.logout.teacher;
    } else if (signed_in_type == 'admin') {
      var route = RouteConstants.authentication.logout.admin;
    }
    Requester.delete(
      route,
      resolve,
      reject,
    );
  }

  renderLinks() {
    // TODO(shimmy): Add check for user/teacher here.
    return(
      <Nav pullRight>
        <NavItem href={RouteConstants.student.dashboard}>Dashboard</NavItem>
        <NavItem href={RouteConstants.student.lessons}>My Lessons</NavItem>
        <NavItem href={RouteConstants.student.profile}>Profile</NavItem>
      </Nav>
    );
  }

  render () {
    return (
    <div>
      <Navbar
        fixedTop={true}
        className="user-header">
        <Navbar.Header>
            <Navbar.Brand>
              <a className="header__logo" href="/">
                <img src={ImageConstants.logos.white} />
              </a>
            </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem onClick={() => this.logout()}>LOG OUT</NavItem>
          </Nav>
          {this.renderLinks()}
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

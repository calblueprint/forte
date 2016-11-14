class Header extends React.Component {

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

  renderButton() {
    var signed_in = getCookie('is_signed_in');
    if (signed_in == 'true') {
      return (
        <NavItem onClick={() => this.logout()}>LOG OUT</NavItem>
      );
    } else {
      return (
        <NavDropdown title="LOG IN">
          <MenuItem href={RouteConstants.authentication.login.student} eventKey={3.1}>Student</MenuItem>
          <MenuItem href={RouteConstants.authentication.login.teacher}>Teacher</MenuItem>
          <MenuItem divider />
          <MenuItem href={RouteConstants.authentication.login.admin}>Admin</MenuItem>
        </NavDropdown>
      );
    }
  }

  render () {
    return (
    <div>
      <Navbar
        fixedTop={true}
        collapseOnSelect
        className="header">
        <Navbar.Header>
            <Navbar.Brand>
              <a className="header__logo" href="/">
                <img src={ImageConstants.logos.orange} />
              </a>
            </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem href={RouteConstants.staticPages.home}>HOME</NavItem>
            <NavItem href={RouteConstants.staticPages.about}>ABOUT US</NavItem>
            <NavItem href={RouteConstants.staticPages.program}>OUR PROGRAM</NavItem>
            <NavItem href={RouteConstants.staticPages.involvement}>GET INVOLVED</NavItem>
            {this.renderButton()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

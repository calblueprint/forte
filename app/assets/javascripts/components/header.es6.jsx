class Header extends React.Component {

  logout() {
    var resolve = (response) => window.location = "/";
    var reject = (response) => console.log(response);
    Requester.delete(
      RouteConstants.authentication.logout.student,
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
          <MenuItem>Admin</MenuItem>
        </NavDropdown>
      );
    }
  }

  render () {
    return (
    <div>
      <Navbar
        fixedTop={true}
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

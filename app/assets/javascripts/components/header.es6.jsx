class Header extends React.Component {

  logout() {
    var resolve = (response) => console.log('LOGGEDOUT');
    var reject = (response) => console.log(response);
    Requester.delete(
      RouteConstants.authentication.logout.student,
      resolve,
      reject,
    );
  }

  render () {
    return (
    <div>
      <Navbar
        fixedTop={true}
        className="header">
        <Navbar.Header>
            <Navbar.Brand>
              <img className="header__logo" src={ImageConstants.logos.orange} href="#" />
            </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem href={RouteConstants.staticPages.about}>ABOUT US</NavItem>
            <NavItem href={RouteConstants.staticPages.program}>OUR PROGRAM</NavItem>
            <NavItem href={RouteConstants.staticPages.involvement}>GET INVOLVED</NavItem>
            <NavDropdown title="LOG IN">
              <MenuItem href={RouteConstants.authentication.login.student} eventKey={3.1}>Student</MenuItem>
              <MenuItem href={RouteConstants.authentication.login.teacher}>Teacher</MenuItem>
              <MenuItem divider />
              <MenuItem>Admin</MenuItem>
            </NavDropdown>
            <NavItem onClick={() => this.logout()}>LOG OUT</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

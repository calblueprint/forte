class UserHeader extends React.Component {

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
            <NavItem>Log Out</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem href={RouteConstants.student.dashboard}>Dashboard</NavItem>
            <NavItem href={RouteConstants.student.lessons}>My Lessons</NavItem>
            <NavItem href={RouteConstants.student.profile}>Profile</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

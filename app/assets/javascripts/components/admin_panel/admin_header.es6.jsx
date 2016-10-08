class AdminHeader extends React.Component {

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
          <Nav pullLeft>
            <NavDropdown title="MATCHING" id="basic-nav-dropdown">
              {/* TO-DO: add href={} for all items*/}
              <MenuItem>Paired</MenuItem>
              <MenuItem>Un-Paired</MenuItem>
            </NavDropdown>
            <NavItem href={RouteConstants.adminPages.lessons}>LESSONS</NavItem>
            <NavItem href={RouteConstants.adminPages.roster}>ROSTER</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>LOG IN</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

class AdminHeader extends React.Component {

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
          <Nav pullLeft>
            <NavDropdown title="MATCHING">
              {/* TO-DO: add href={} for all items*/}
              <MenuItem>Matched</MenuItem>
              <MenuItem>Not Matched</MenuItem>
            </NavDropdown>
            <NavItem href={RouteConstants.adminPages.lessons}>LESSONS</NavItem>
            <NavItem href={RouteConstants.adminPages.roster}>ROSTER</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>Log Out</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

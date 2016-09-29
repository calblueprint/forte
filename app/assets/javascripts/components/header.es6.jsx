class Header extends React.Component {

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
            <NavItem>ABOUT US</NavItem>
            <NavItem>OUR PROGRAM</NavItem>
            <NavItem>GET INVOLVED</NavItem>
            <NavItem>LOG IN</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

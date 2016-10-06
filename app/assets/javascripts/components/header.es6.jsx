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
            <NavItem href={RouteConstants.staticPages.about}>ABOUT US</NavItem>
            <NavItem href={RouteConstants.staticPages.program}>OUR PROGRAM</NavItem>
            <NavItem href={RouteConstants.staticPages.involvement}>GET INVOLVED</NavItem>
            <NavItem>LOG IN</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

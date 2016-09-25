class Header extends React.Component {

  get styles() {
    return {
      logo: {
        padding: 0,
      },
      navBar: {
        backgroundColor: StyleConstants.colors.white,
      },
    };
  }

  render () {
    return (
    <div>
      <Navbar
        fixedTop={true}
        style={this.styles.navBar}>
        <Navbar.Header>
            <Navbar.Brand>
              <img style={this.styles.logo} src={ImageConstants.logos.orange} href="#" />
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

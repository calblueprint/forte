class Footer extends React.Component {

  get styles() {
    return {
      navBar: {
        backgroundColor: StyleConstants.colors.grey,
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: "20px 0px",
      },
      linksContainer: {
        color: StyleConstants.colors.white,
        fontSize: StyleConstants.fonts.sizes.smaller,
      },
      link: {
        color: StyleConstants.colors.white,
      },
      nonprofitLabel: {
        color: StyleConstants.colors.greyLight,
        fontSize: StyleConstants.fonts.sizes.smallest
      },
    };
  }
  
  render () {
    return (
      <div>
      <Navbar 
        fixedBottom={true}
        style={this.styles.navBar}>
        <div style={this.styles.content}>
          <div style={this.styles.linksContainer}>
            <span>© 2016 Forte Academy, Inc.</span>
            <span>    ·    </span>
            <a style={this.styles.link} href="#">Terms & Privacy</a>
            <span>    ·    </span>
            <a style={this.styles.link} href="#">Contact Us</a>
          </div>
          <div style={this.styles.nonprofitLabel}>
            <span>Forte academy, Inc. is a 501(c)(3) nonprofit organization.</span>
          </div>
        </div>
      </Navbar>
      </div>
    );
  }
}

class Footer extends React.Component {

  render () {
    return (
      <div className="footer">
        <div className="footer__links-container">
          <span>© 2019 Forte Academy, Inc.</span>
          <span>    ·    </span>
          <a className="link" href={RouteConstants.staticPages.terms}>Terms & Privacy</a>
          <span>    ·    </span>
          <a className="link" href={RouteConstants.staticPages.contact}>Contact Us</a>
        </div>
        <div className="footer__nonprofit-label">
          <span>Forte Academy, Inc. is a 501(c)(3) nonprofit organization.</span>
        </div>
      </div>
    );
  }
}

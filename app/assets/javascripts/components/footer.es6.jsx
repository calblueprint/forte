class Footer extends React.Component {
  
  render () {
    return (
      <div className="footer">
        <div className="footer__links-container">
          <span>© 2016 Forte Academy, Inc.</span>
          <span>    ·    </span>
          <a className="link" href="#">Terms & Privacy</a>
          <span>    ·    </span>
          <a className="link" href="#">Contact Us</a>
        </div>
        <div className="footer__nonprofit-label">
          <span>Forte academy, Inc. is a 501(c)(3) nonprofit organization.</span>
        </div>
      </div>
    );
  }
}

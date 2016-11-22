class Contact extends React.Component {
  render () {
    return (
      <div className="page-wrapper">
        <Header />
          <div className="contact-page content-wrapper">
            <form className="contact-form" action="/send_contact_email" method="post">
              <p className="questions">Any questions, concerns or suggestions?  We're all ears.</p>
              <input type="text" className="input-field half-width-input" name="first_name" placeholder="First Name"></input>
              <input type="text" className="input-field half-width-input last-name-input" name="last_name" placeholder="Last Name"></input>
              <input type="text" className="input-field full-width-input" name="email" placeholder="Email Address"></input>
              <input type="text" className="input-field full-width-input subject-input" name="subject" placeholder="Subject"></input>
              <textarea type="text" className="input-field full-width-input message-input" name="message" placeholder="Message"></textarea>
              <input type="hidden" name="authenticity_token" value={this.props.authenticity_token}></input>
              <Button className="button button--outline-orange" type="submit">Submit</Button>
            </form>
          </div>
        <Footer />
      </div>
    );
  }
}

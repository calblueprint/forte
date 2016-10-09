class Contact extends React.Component {
  render () {
    return (
      <div className="page-wrapper">
        <Header />
          <div className="contact-page content-wrapper">
            <form className="contact-form" action="demo_form.asp">
              <p className="questions">Any questions, concerns or suggestions?  We're all ears.</p>
              <input type="text" className="input-field half-width-input" name="first-name" placeholder="First Name"></input>
              <input type="text" className="input-field half-width-input last-name-input" name="last-name" placeholder="Last Name"></input>
              <input type="text" className="input-field full-width-input" name="email" placeholder="Email Address"></input>
              <input type="text" className="input-field full-width-input subject-input" name="subject" placeholder="Subject"></input>
              <textarea type="text" className="input-field full-width-input message-input" name="message" placeholder="Message"></textarea>
              <Button className="button button--outline-orange">Submit</Button>
            </form>
          </div>
        <Footer />
      </div>
    );
  }
}

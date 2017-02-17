class Contact extends React.Component {
  render () {
    return (
      <div className="page-wrapper">
        <Header />
          <div className="container contact-page content-wrapper">
            <h1 className="questions">Any questions, concerns or suggestions?  We're all ears.</h1>
            <div className="contact-col">
              <form className="contact-form" action="/send_contact_email" method="post">
                <div className="form-row">
                  <FormGroup>
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                      componentClass="input"
                      placeholder="Jonathan"
                      name="first_name" />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl
                      componentClass="input"
                      placeholder="Miller"
                      name="last_name" />
                  </FormGroup>
                </div>
                <FormGroup>
                  <ControlLabel>Email Address</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="example@gmail.com"
                    name="email" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Subject</ControlLabel>
                  <FormControl
                    componentClass="input"
                    placeholder="Scheduling question"
                    name="subject" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Message</ControlLabel>
                  <FormControl
                    className="textarea"
                    componentClass="textarea"
                    placeholder="Hey there! I have a question about scheduling and availability..."
                    name="message" />
                </FormGroup>

                <input type="hidden" name="authenticity_token" value={this.props.authenticity_token}></input>

                <Button className="button button--solid-orange" type="submit">Submit</Button>
              </form>
            </div>
            <div className="contact-col">
              <h3>Forte Academy, Inc.</h3>
              <p className="contact-detail">501(c)(3) nonprofit organization based in San Francisco, CA</p>
              <p className="contact-detail">Email: <a href="mailto:contact@forteacademy.org">contact@forteacademy.org</a></p>
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}

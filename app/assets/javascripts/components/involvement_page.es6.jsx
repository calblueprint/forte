class InvolvementPage extends React.Component {

  renderOption(option) {
    middle = false;
    switch (option) {
      case 'student':
        optionIcon = ImageConstants.roles.student;
        optionTitle = 'Student';
        optionDescription = 'Learn your dream instrument at deeply discounted rates.';
        buttonText = 'Start Learning';
        break;
      case 'teacher':
        optionIcon = ImageConstants.instruments.clarinet;
        optionTitle = 'Teacher';
        optionDescription = 'Share your passion for music with our students and help provide access to affordable music education.';
        buttonText = 'Start Teaching';
        middle = true;
        break;
      case 'donor':
        optionIcon = ImageConstants.roles.donor;
        optionTitle = 'Donor';
        optionDescription = 'Support Forte in our mission to change the lives of underserved youth musicians.';
        buttonText = 'Donate Now';
        break;
    }

    return (
      <div className={"option " + (middle ? "middle" : "")}>
        <div className="option-icon">
          <img src={optionIcon} href="#" />
        </div>
        <h2 className="option-title">{optionTitle}</h2>
        <div className="separator"/>
        <div className="option-description">
          <h5>{optionDescription}</h5>
        </div>
        <div className="option-button">
          <Button className="button button--outline-orange">{buttonText}</Button>
        </div>
      </div>
    );
  }

  renderFooter() {
    return (
       <div className="involvement-footer">
        <div className="involvement-footer footer__links-container">
          <span>Interested in partnering with Forte? </span>
          <a className="link" href="#">Contact Us.</a>
        </div>
      </div>
    );
  }

  render() {
    return (
     <div className="page-wrapper">
      <Header />
      <div className="involvement-page content-wrapper">
        <div className="container">
          <div className="title-container">
            <h1 className="title">
              Get Involved with Forte Today!
            </h1>
          </div>
          <div className="options-container">
            {this.renderOption('student')}
            {this.renderOption('teacher')}
            {this.renderOption('donor')}
          </div>
        </div>
      </div>
      {this.renderFooter()}
      <Footer />
    </div>
    );
  }
}

class InvolvementPage extends React.Component {

  renderOption(option) {
    middle = false;
    switch (option) {
      case 'student':
        optionIcon = ImageConstants.roles.student;
        optionTitle = 'Student';
        optionDescription = 'Learn your dream instrument at deeply discounted rates.';
        buttonText = 'Apply to Learn';
        url = RouteConstants.form.student;
        break;
      case 'teacher':
        optionIcon = ImageConstants.instruments.piano;
        optionTitle = 'Teacher';
        optionDescription = 'Share your passion for music with our students and help provide access to affordable music education.';
        buttonText = 'Apply to Teach';
        url = RouteConstants.form.teacher;
        middle = true;
        break;
      case 'donor':
        optionIcon = ImageConstants.roles.donor;
        optionTitle = 'Donor';
        optionDescription = 'Support Forte in our mission to change the lives of underserved youth musicians.';
        buttonText = 'Donate Now';
        url = url = RouteConstants.form.teacher;
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
          <p>{optionDescription}</p>
        </div>
        <div className="option-button">
          <a href={url} className="button button--outline-orange">{buttonText}</a>
        </div>
      </div>
    );
  }

  render() {
    return (
     <div className="page-wrapper">
      <Header />
      <div className="involvement-page content-wrapper">
        <div className="content-container">
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
      <Footer />
    </div>
    );
  }
}

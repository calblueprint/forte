class HomePage extends React.Component {

  renderInstrument(option) {
    switch (option) {
      case 'piano':
        image = ImageConstants.instruments.piano;
        description = 'Piano';
        break;
      case 'guitar':
        image = ImageConstants.instruments.guitar;
        description = 'Guitar';
        break;
      case 'clarinet':
        image = ImageConstants.instruments.clarinet;
        description = 'Clarinet';
        break;
    }
    return (
      <div className="instrument">
        <img src={image} alt={description} />
        <h2 className="instrument__description">{description}</h2>
      </div>
    )
  }
  
  render () {
    return (
      <div className="page-wrapper">
        <Header />
          <div className="home-page content-wrapper">
            <div className="title-wrapper">
              <h1 className="title-text">
                We connect underserved youth with experienced 
                musicians to provide access to affordable music lessons.
              </h1>
              <div className="button-container">
                <button className="button button--solid-white button--lg">Learn</button>
                <button className="button button--solid-white button--lg">Teach</button>
              </div>
            </div>
            <div className="instruments-wrapper">
              {this.renderInstrument('piano')}
              {this.renderInstrument('guitar')}
              {this.renderInstrument('clarinet')}
            </div>
            <div className="home-page__line-break">
            </div>
            <div className="information-wrapper">
              <div className="information-block">
                <h2 className="information-block__title">Our Mission</h2>
                <p className="information-block__description">
                  To democratize music education and empower youth to discover,
                  learn, and love music.
                </p>
              </div>
              <div className="information-block">
                <h2 className="information-block__title">How it works</h2>
                <p className="information-block__description">
                  Our teachers provide deeply discounted private instruction to 
                  underserved youth in the Bay Area.
                </p>
              </div>
              <div className="information-block">
                <h2 className="information-block__title">Get Involved</h2>
                <p className="information-block__description">
                  Teach our students, learn an instrument or donate to our cause.
                </p>
              </div>
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}

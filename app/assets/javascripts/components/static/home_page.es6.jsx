class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.instruments = [
      "piano",
      "guitar",
      "clarinet",
    ];
  }

  renderInstrument(instr, index) {
    let image = ImageConstants.instruments[instr];
    let instrument = capitalizeFirstLetter(instr);
    let teachLink = RouteConstants.form.teacher + "#" + instrument;
    let learnLink = RouteConstants.form.student + "#" + instrument;

    return (
      <div className="instrument" key={index}>
        <div className="instrument-hover-container">
          <h2 className="instrument__description">{instrument}</h2>
          <div className="instrument-btn-container">
            <a className="button button--solid-white" href={teachLink}>Teach</a>
            <a className="button button--solid-white" href={learnLink}>Learn</a>
          </div>
        </div>
        <img src={image} alt={instrument} />
      </div>
    )
  }

  render () {
    let instruments = this.instruments.map((instrument, index) => {
      return this.renderInstrument(instrument, index);
    });

    return (
      <div className="page-wrapper">
        <Header />
          <div className="home-page content-wrapper">
            <div className="title-wrapper">
              <h2 className="title-text">
                Grab a chair. Take a stand.
              </h2>
              <div className="button-container">
                <Button className="button button--solid-orange button--lg home-cta"
                        onClick={() => window.location = RouteConstants.form.student}>
                  Learn
                </Button>
                <Button className="button button--solid-orange button--lg home-cta"
                        onClick={() => window.location = RouteConstants.form.teacher}>
                  Teach
                </Button>
              </div>
            </div>
            <h6 className="forte-description">
              Forte connects underserved youth with experienced musicians to provide
              access to affordable music lessons.
            </h6>
            <div className="instruments-wrapper">
              {instruments}
            </div>
            <div className="home-page__line-break">
            </div>
            <div className="information-wrapper">
              <div className="information-block">
                <h2 className="information-block__title">About Us</h2>
                <p className="information-block__description">
                  We aim to democratize music education and empower youth to discover,
                  learn and love music.
                </p>
                <a className="home__link" href={RouteConstants.staticPages.about}>Read more</a>
              </div>
              <div className="information-block">
                <h2 className="information-block__title">Our Program</h2>
                <p className="information-block__description">
                  Our teachers provide affordable private instruction to underserved
                  middle school students in the Bay Area, New York City and Los Angeles.
                </p>
                <a className="home__link" href={RouteConstants.staticPages.program}>Read more</a>
              </div>
              <div className="information-block">
                <h2 className="information-block__title">Get Involved</h2>
                <p className="information-block__description">
                  Teach our students, learn an instrument or donate to our cause.
                </p>
                <a className="home__link" href={RouteConstants.staticPages.involvement}>Read more</a>
              </div>
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}

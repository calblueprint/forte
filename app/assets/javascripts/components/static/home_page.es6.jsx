class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.instruments = [
      "piano",
      "percussion",
      "guitar",
      "violin",
      "flute",
      "trumpet",
      "clarinet",
    ];

    this.state = {
      currentInstrumentIndex: 0,
    }
  }

  instrumentLeftButtonClick() {
    const { currentInstrumentIndex } = this.state;
    if (currentInstrumentIndex >= 1) {
      document.getElementById('instruments-inner-wrapper').style.marginLeft = `-${(currentInstrumentIndex - 1) * 340}px`;
      this.setState({ currentInstrumentIndex: currentInstrumentIndex - 1 })
    }
  }

  instrumentRightButtonClick() {
    const { currentInstrumentIndex } = this.state;
    let totalNumInstruments = this.instruments.length;
    if (currentInstrumentIndex + 3 < totalNumInstruments) {
      document.getElementById('instruments-inner-wrapper').style.marginLeft = `-${(currentInstrumentIndex + 1) * 340}px`;
      this.setState({ currentInstrumentIndex: currentInstrumentIndex + 1 })
    }
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

  renderInstruments() {
    return this.instruments.map((instrument, index) => {
      return this.renderInstrument(instrument, index);
    });
  }

  renderLeftButton() {
    const { currentInstrumentIndex } = this.state;
    let className = "arrow-button"
    if (currentInstrumentIndex == 0){
      className += " button-disabled"
    }
    return (
      <Glyphicon glyph="chevron-left" className={className} id="left-button"
        onClick={() => this.instrumentLeftButtonClick()}/>
    )
  }

  renderRightButton() {
    const { currentInstrumentIndex } = this.state;
    let totalNumInstruments = this.instruments.length;
    let className = "arrow-button"
    if (currentInstrumentIndex + 3 == totalNumInstruments){
      className += " button-disabled"
    }
    return (
      <Glyphicon glyph="chevron-right" className={className} id="right-button"
        onClick={() => this.instrumentRightButtonClick()}/>
    )
  }

  render () {
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
            <div className="carousel-wrapper">
              {this.renderLeftButton()}
              <div className="instruments-wrapper">
                <div className="instruments-inner-wrapper" id="instruments-inner-wrapper">
                {this.renderInstruments()}
                </div>
              </div>
              {this.renderRightButton()}
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
            <div className="testimonial__line-break"></div>
            <h6 className="forte-description">
              Testimonials
            </h6>
            <div className="testimonial-wrapper">
              <div className="testimonial-block">
                <h2 className="testimonial-block__title">Our Students</h2>
                <div className="testimonial-description-wrapper">
                  <p className="testimonial-block__description">
                    “The lessons truly help you and it’s a fun time overall. The teachers improve your skills and help you
                    get you to where you never thought you could be”
                  <p className="testimonial-block__name">
                   — Jalen, 8th grade
                   </p>
                  </p>
                </div>
                <div className="testimonial-description-wrapper">
                  <p className="testimonial-block__description">
                    “The teachers are inspirational. They have high expectations so you want to try harder. They really help me improve”
                  <p className="testimonial-block__name">
                   — Muwazu, 8th grade
                   </p>
                  </p>
                </div>
              </div>
              <div className="testimonial-block">
                <h2 className="testimonial-block__title">Our Teachers</h2>
                <div className="testimonial-description-wrapper">
                  <p className="testimonial-block__description">
                    “It’s a great experience because I can see how to make a difference in someone’s life by sharing the joy of music”
                  </p>
                  <p className="testimonial-block__name">
                    — Harrison, UC Berkeley
                  </p>
                </div>
                <div className="testimonial-description-wrapper">
                  <p className="testimonial-block__description">
                  “Forte is great at applying my experience and taking my preferences into consideration. The lessons are a re-energizing experience”
                  </p>
                  <p className="testimonial-block__name">
                  — Lannie, UC Berkeley
                 </p>
                </div>
              </div>
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}

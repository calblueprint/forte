class AboutPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      people: [
        'daniel', 'richard', 'shain', 'rocky', 
        'rachel', 'sahil', 'lancy'
      ], 
    }
  }

  renderIndividual(option) {
    switch (option) {
      case 'daniel':
        name = 'Daniel Kim';
        position = 'Chief Executive Officer';
        image = ImageConstants.headshots.daniel;
        break;

      case 'richard':
        name = 'Richard Donahue';
        position = 'Chief Financial Officer';
        image = ImageConstants.headshots.richard;
        break;

      case 'shain':
        name = 'Shain Lafazan';
        position = 'Chief Technology Officer';
        image = ImageConstants.headshots.shain;
        break;

      case 'rocky':
        name = 'Rocky Yip';
        position = 'Director of Campus Recruitment';
        image = ImageConstants.headshots.rocky;
        break;

      case 'rachel':
        name = 'Rachel Ng';
        position = 'Business Development';
        image = ImageConstants.headshots.rachel;
        break;

      case 'sahil':
        name = 'Sahil Patel';
        position = 'Business Development';
        image = ImageConstants.headshots.sahil;
        break;

      case 'lancy':
        name = 'Lancy Zhang';
        position = 'Design Advisor';
        image = ImageConstants.headshots.lancy;
        break;
    }
    return (
      <div className="section__individual-container">
        <img className="section__image" src={image} href="#" />
        <div className="section__person-info">
          <h4 className="section__name">
            {name}
          </h4>
          <h5 className="section__position">
            {position}
          </h5>
        </div>
      </div>
    );
  }

  renderIndividuals() {
    return this.state.people.map((person) => this.renderIndividual(person));
  }
  
  render() {
    return (
      <div className="page-wrapper">
        <Header />
          <div className="content-wrapper about-page">
            <div className="section">
              <h2 className="section__title">
                for·te
              </h2>
              <h4 className="section__subtitle">
                adj. loudly, with passion and energy
                n. one's strength, talent or skill
              </h4>
            </div>
            <div className="section">
              <h2 className="section__title">
                What is our mission?
              </h2>
              <h4 className="section__subtitle">
                To democratize music education and empower youth to discover, learn and love music.
              </h4>
              <p className="section__text">
                Music is a universal language. It provides an outlet for artistic expression and evokes
                emotions connecting audiences worldwide. It is a craft meant to be learned, appreciated
                and shared equally among people from all walks of life.
              </p>
              <p className="section__text">
                The pursuit of one's musical interests is an enriching experience that can have far-reaching
                benefits including enhanced creativity, discipline, teamwork and self-confidence. But
                development as a musician requires far more than passion and dedication. Resources such
                as instrument access, private instruction and mentorship are pivotal to success, but remain
                out of reach for many aspiring musicians.
              </p>
              <p className="section__text">
                Our aim is to break down the barriers that surround music today. We created Forte as a
                non-profit platform to foster the accessibility of music education to underprivileged youth.
                Forte unlocks a pathway for student musicians from challenged neighborhoods by matching
                them with experienced volunteers who can provide lessons at significantly discounted rates.
              </p>
            </div>
            <div className="section">
              <h2 className="section__title">
                How did we start?
              </h2>
              <h4 className="section__subtitle">
                We are deeply rooted in the tradition of using music to serve our community.
              </h4>
              <p className="section__text">
                Forte's roots trace back to 2008, when our CEO formed a service organization at Homestead
                High School allowing student musicians to collaborate via small ensembles. Ranging from
                duos to quintets, these intimate groups inspired levels of student independence and
                creativity greater than those typically afforded by school-wide bands, orchestras or choirs.
                Through this organization, students connected with and enriched the local community via
                public performances for audiences including HCR ManorCare, the Santa Clara Valley Blind
                Center, and the J.W. House of Kaiser Permanente.
              </p>
              <p className="section__text">
                In this spirit, we launched Forte in 2015 with the vision of leveraging music education as a
                platform to enrich the lives of the youth who otherwise may not have the resources or guidance
                to pursue their musical passions.
              </p>
            </div>
            <div className="section">
              <h2 className="section__title">
                Who are we?
              </h2>
              <div className="section__headshots-container">
                {this.renderIndividuals()}
              </div>
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}

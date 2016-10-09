class AboutPage extends React.Component {

  renderIndividual(option) {
    switch (option) {
      
      case 'daniel':
        optionName = 'Daniel Kim';
        optionPosition = 'Chief Executive Officer';
        break;

      case 'richard':
        optionName = 'Richard Donahue';
        optionPosition = 'Chief Financial Officer';
        break;

      case 'shain':
        optionName = 'Shain Lafazan';
        optionPosition = 'Chief Technology Officer';
        break;

      case 'rocky':
        optionName = 'Rocky Yip';
        optionPosition = 'Director of Campus Recruitment';
        break;
    }
    return (
      <div className="section__person-info">
        <h4 className="section__name">
          {optionName}
        </h4>
        <h5 className="section__position">
          {optionPosition}
        </h5>
      </div>
    );
  }
  
  render() {
    return (
      <div className="about-page">
        <div className="page-wrapper">
          <Header />
            <div className="content-wrapper">
              <div className="section">
                <h2 className="section__title">
                  Forte |&#8217;fôr,t&#x0101;|
                </h2>
                <h5 className="section__subtitle">
                  adj. loudly, with passion and energy<br></br>
                  n. one's strength, talent or skill
                </h5>
              </div>
              <div className="section">
                <h2 className="section__title">
                  What is our mission?
                </h2>
                <h5 className="section__subtitle">
                  It is to empower underserved youth to discover, learn and love music performance.
                </h5>
                <p className="section__text">
                  Music is a universal language. It provides an outlet for artistic expression and evokes<br></br>
                  emotions connecting audiences worldwide. It is a craft meant to be learned, appreciated<br></br>
                  and shared equally among people from all walks of life.
                </p>
                <p className="section__text">
                  The pursuit of one's musical interests is an enriching experience that can have far-reaching<br></br>
                  benefits including enhanced creativity, discipline, teamwork and self-confidence. But<br></br>
                  development as a musician requires far more than passion and dedication. Resources such<br></br>
                  as instrument access, private instruction and mentorship are pivotal to success, but remain<br></br>
                  out of reach for many aspiring musicians.
                </p>
                <p className="section__text">
                  Our aim is to break down the barriers that surround music today. We created Forte as a<br></br>
                  non-profit platform to foster the accessibility of music education to underprivileged youth.<br></br>
                  Forte unlocks a pathway for student musicians from challenged neighborhoods by matching<br></br>
                  them with experienced volunteers who can provide lessons at significantly discounted rates.
                </p>
              </div>
              <div className="section">
                <h2 className="section__title">
                  How did we start?
                </h2>
                <h5 className="section__subtitle">
                  We are deeply rooted in the tradition of using music to serve our community.
                </h5>
                <p className="section__text">
                  Forte's roots trace back to 2008, when our CEO formed a service organization at Homestead<br></br>
                  High School allowing student musicians to collaborate via small ensembles. Ranging from<br></br>
                  duos to quintets, these intimate groups inspired levels of student independence and<br></br>
                  creativity greater than those typically afforded by school-wide bands, orchestras or choirs.<br></br>
                  Through this organization, students connected with and enriched the local community via<br></br>
                  public performances for audiences including HCR ManorCare, the Santa Clara Valley Blind<br></br>
                  Center, and the J.W. House of Kaiser Permanente.
                </p>
                <p className="section__text">
                  In this spirit, we launched Forte in 2015 with the vision of leveraging music education as a<br></br>
                  platform to enrich the lives of the youth who otherwise may not have the resources or guidance<br></br>
                  to pursue their musical passions.
                </p>
              </div>
              <div className="section">
                <h2 className="section__title">
                  Who are we?
                </h2>
                <div className="section__headshots-container">
                  <div className="section__individual-container">
                    <div>
                      <img className="section__image" src={ImageConstants.headshots.daniel} href="#" />
                    </div>
                    {this.renderIndividual('daniel')}
                  </div>
                  <div className="section__individual-container">
                    <div>
                      <img className="section__image" src={ImageConstants.headshots.richard} href="#" />
                    </div>
                    {this.renderIndividual('richard')}
                  </div>
                  <div className="section__individual-container">
                    <div>
                      <img className="section__image" src={ImageConstants.headshots.shain} href="#" />
                    </div>
                    {this.renderIndividual('shain')}
                  </div>
                  <div className="section__individual-container">
                    <div>
                      <img className="section__image" src={ImageConstants.headshots.rocky} href="#" />
                    </div>
                    {this.renderIndividual('rocky')}
                  </div>
                </div>
              </div>
            </div>
          <Footer />
        </div>
      </div>
    );
  }
}

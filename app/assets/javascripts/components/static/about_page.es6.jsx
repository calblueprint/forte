class AboutPage extends React.Component {

  constructor(props) {
    super(props);
    this.individuals = [
      {
        name: 'Daniel Kim',
        position: 'Co-founder & CEO',
        image: ImageConstants.headshots.daniel,
        bio: `At his high school, Daniel created a service organization that performed chamber music for
          the underprivileged. In similar spirit, his team launched Forte seven years later as a nonprofit
          organization using music to enrich the development of youth in the underserved community. He is a
          CM 10 pianist and has performed as a bassoonist in several ensembles including the the UC Berkeley
          University Symphony Orchestra, Stanford Symphony Orchestra, San Jose Youth Philharmonic and Silicon
          Valley Volunteer Orchestra.

          Daniel graduated from UC Berkeley and lives in New York City.`
      },
      {
        name: 'Richard Donahue',
        position: 'Co-founder & CFO',
        image: ImageConstants.headshots.richard,
        bio: `Since childhood, Richard has explored music through a variety of avenues including teaching,
          composing, conducting and performing.  Whether playing oboe on Bizet\'s Carmen Suite in Venice,
          conducting a marching band or playing electric guitar in Hollywood\'s House of Blues, he has
          enthusiastically shared his love of music with others. In co-founding Forte, he hopes to enable
          others to do the same.

          Richard graduated from UCLA and currently lives in Los Angeles.`
      },
      {
        name: 'Patrick Whitrock',
        position: 'CTO',
        image: ImageConstants.headshots.patrick,
        bio: `From banging on pots and pans to playing timpani at Lincoln Center, music has always
          been an important part of Patrick's life. As a classically trained percussionist, he has
          performed as a soloist and as a member of an ensemble at some of New York's most
          prestigious venues. His passion for music led him to a music degree from New York
          University and a career supporting songwriters in the music publishing industry.

          As a former product manager turned software engineer in New York City, Patrick strives to
          empower others to enrich their lives through music.`
      },
      {
        name: 'Andrew Hasel',
        position: 'CMO',
        image: ImageConstants.headshots.andrew,
        bio: `Andrew was born into music as his mother started him on the piano at 5 and cello at 9.
          As a cellist, he performed numerous times at Carnegie Hall and Lincoln Center with
          orchestras such as the Metropolitan Youth Orchestra of New York and Gemini Youth Orchestra.
          In high school, he performed in New York’s All-State Symphony, and continued playing in
          college where he graduated from The University of Southern California. Andrew is currently a
          cellist in the Los Angeles Doctors Symphony Orchestra, a community orchestra that supports
          important medical causes and offers high-quality affordable concerts to the diverse
          communities in Southern California.

          Andrew currently lives in Los Angeles, CA.`
      },
      {
        name: 'Rocky Yip',
        position: 'Director of Campus Recruitment',
        image: ImageConstants.headshots.rocky,
        bio: `What started out as a mandatory class turned into a lifelong musical interest when Rocky picked
            up the clarinet at age 12.  Since then, he has since enjoyed competing in music festivals and
            performing in ensembles including British Columbia\'s Provincial Honor Band and Canada\'s National
            Wind Orchestra. He is passionate about providing access to music education for all and is currently
            looking for people who share his enthusiasm to join the Forte team.

            Rocky graduated from UC Berkeley and lives in San Francisco.`
      },
      {
        name: 'Rachel Ng',
        position: 'Business Development',
        image: ImageConstants.headshots.rachel,
        bio: `An alumnus of Ruth Asawa San Francisco School of the Arts, Rachel has been involved with music both
            as a student and a teacher for over a decade. In addition to personal achievements in piano
            competitions and examinations, she also founded a regional, local student music club in the East
            Bay. After seeing how music could have a direct, positive impact on children as a volunteer piano
            teacher in Oakland Chinatown, she hopes to give back to the community through Forte and its mission.

            Rachel is currently an undergraduate student at UC Berkeley.`
      },
      {
        name: 'Sahil Patel',
        position: 'Business Development',
        image: ImageConstants.headshots.sahil,
        bio: `Music has been an active part of Sahil\'s life ever since he was handed a saxophone in 4th grade.
            Since then, he has picked up drumsticks as well and has played in jazz groups that volunteer at
            nonprofit fundraisers. Wanting to continue his commitment to the music community, he joined Forte
            in the hopes of furthering his impact and sharing the energy of music.

            Sahil is currently an undergraduate student at UC Berkeley.`
      },
      {
        name: 'Lancy Zhang',
        position: 'Design Advisor',
        image: ImageConstants.headshots.lancy,
        bio: `A tutor for underserved children for four years, Lancy wants to make education more accessible to
            everyone and deeply aligns with Forte\'s mission. Fine arts education, from painting to music,
            had always been a key component of Lancy\'s upbringing. She hopes to bring her visual design
            skills to building Forte’s platform.

            Lancy graduated from UC Berkeley and lives in San Francisco.`
      }
    ];
  }

  renderIndividuals() {
    return this.individuals.map((person) => {
      return <StaffInfo person={person} />
    });
  }

  render() {
    return (
      <div className="page-wrapper">
        <Header />
          <div className="content-wrapper about-page">
            <div className="section">
              <h1 className="section__title forte-title">
                for·te
              </h1>
              <h4 className="section__subtitle">
                <span className="forte-defn-label">adj.</span> loudly, with passion and energy <br/>
                <span className="forte-defn-label">n.</span> one's strength, talent or skill
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
                Forte's roots trace back to 2008, when Daniel formed a service organization at Homestead
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

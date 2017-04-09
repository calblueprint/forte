class ProgramPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      introduction: false,
      teachers: false,
      students: false,
      underserved: false,
      pricing: false,
      payments: false,
      reschedule: false,
      instruments: false,
      safety: false,
      resources: false,
    };
  }

  handleQuestion(topic) {
    if (topic == 'introduction') {
      this.setState({ introduction: !this.state.introduction });
    } else if (topic == 'teachers') {
      this.setState({ teachers: !this.state.teachers });
    } else if (topic == 'students') {
      this.setState({ students: !this.state.students });
    } else if (topic == 'underserved') {
      this.setState({ underserved: !this.state.underserved });
    } else if (topic == 'pricing') {
      this.setState({ pricing: !this.state.pricing });
    } else if (topic == 'payments') {
      this.setState({ payments: !this.state.payments });
    } else if (topic == 'reschedule') {
      this.setState({ reschedule: !this.state.reschedule });
    } else if (topic == 'instruments') {
      this.setState({ instruments: !this.state.instruments });
    } else if (topic == 'safety') {
      this.setState({ safety: !this.state.safety });
    } else if (topic == 'resources') {
      this.setState({ resources: !this.state.resources });
    }
  }

  renderAnswer(topic) {
    if (topic == "teachers" && this.state.teachers) {
      return (
        <div>
          <p className="answer">
            Most of our teachers are experienced non-professional musicians
            currently studying at undergraduate/graduate programs or working in
            the local community.  Forte offers teachers a rewarding opportunity
            to enrich the lives of underserved youth while leveraging their unique
            skill set.  Though many of our teachers are currently active in the
            music community outside of Forte, for some it provides an avenue to
            reconnect with their passion for music and share it with others.
          </p>
          <p className="answer">
            Our teachers may elect to provide lessons as either unpaid volunteers
            or paid contractors.  Volunteers supporting Forte earn community
            service hours with all lesson proceeds contributed to the Forte
            nonprofit and used to maintain and expand our programs.  Those
            choosing to teach as paid contractors retain 75%+ of all lesson
            proceeds, making our program an attractive and flexible opportunity
            to earn supplemental income while making a positive impact.
          </p>
        </div>
      );
    } else if (topic == "students" && this.state.students) {
      return (
        <p className="answer">
          Our goal is to serve students and their families by providing affordable
          access to quality private lessons that would otherwise be out of reach.
          We encourage all interested students to apply, but we prioritize acceptance
          for those who stand to benefit the most from our programs as evidenced by
          factors including family income, availability of quality instruction,
          prior musical experience and future goals.
        </p>
      );
    } else if (topic == "underserved" && this.state.underserved) {
      return (
        <p className="answer">
          To us, underserved students are those who lack the proper resources or
          funding to fully pursue their musical aspirations.  With public school
          budgets dramatically reduced in recent years, even traditionally
          affordable school music programs have inevitably declined in quality
          or, in some cases, been completely eliminated.  With traditional
          private instruction accessible to only a select few, we aim to bridge
          the gap for many students and their families by creating an affordable,
          high-quality alternative.
        </p>
      );
    } else if (topic == "pricing" && this.state.pricing) {
      return (
        <div>
          <p className="answer">
            Our lessons start at $12 for 30 minutes (compared to $60-80+ per hour
            for traditional private lessons) and vary depending on instrument,
            location, and lesson duration. We also offer scholarships for special
            circumstances, in which students receive free 30-minute lessons.
          </p>
          <p className="answer">
            From the lesson proceeds, Forte retains up to 25% to support our
            programs and our teachers receive the remainder of our lesson proceeds.
            Teachers can also opt to offer lessons as volunteers, and can select to
            either charge no payment to the student or help fund and expand Forte’s
            nonprofit programs.
          </p>
        </div>
      );
    } else if (topic == "payments" && this.state.payments) {
      return (
        <p className="answer">
          After lessons are held, we collect lesson fees from students and distribute
          teacher payments online via Stripe. Payment processing is handled directly
          and securely by Stripe with no sensitive information stored by Forte. We
          support all major credit and debit cards, but do not accept cash payment for lessons.
        </p>
      );
    } else if (topic == "reschedule" && this.state.reschedule) {
      return (
        <p className="answer">
          No problem! As soon as possible, please log in to your account and cancel your lesson.
          Alternatively, you can email us at contact@forteacademy.org to ensure billing is handled appropriately.
          For late cancellations (within 24 hours of the scheduled lesson time) or no-shows, students will be charged $5.
        </p>
      );
    } else if (topic == "instruments" && this.state.instruments) {
      return (
        <p className="answer">
          We currently offer instruction for woodwinds (flute, clarinet, saxophone,
          oboe, bassoon), brass (trumpet, trombone, french horn), strings (violin,
          viola, cello), guitar, piano and voice. This list is quickly expanding
          as teachers with experience in other instruments join our program. If you
          play an instrument we don't currently support, we strongly encourage you
          to apply anyway.
        </p>
      );
    } else if (topic == "safety" && this.state.safety) {
      return (
        <p className="answer">
          We are deeply committed to ensuring the safety of our students as
          well as maintaining the quality of our instruction.  As such, we
          screen prospective teachers before inviting them to use our platform
          with a thorough application and national sex offender registry checks.
          For those interested, we also encourage (but do not require) parents
          to sit in and supervise lessons.
        </p>
      );
    } else if (topic == "resources" && this.state.resources) {
      return (
        <p className="answer">
          Unfortunately, we do not have the resources necessary to facilitate
          instrument access at this time.  In most cases, students and teachers
          will need to bring an instrument to each lesson.  For large instruments,
          including piano, we encourage students and teachers to coordinate in
          determining where lessons should take place given instrument
          availability.
        </p>
      );
    }
  }

  render () {
    return (
      <div className="page-wrapper">
        <Header />
        <div className="content-wrapper program-page">
          <h2 className="section__title">Our Program</h2>
          <h3 className="subtitle">
            Forte connects underserved youth with experienced musicians
            to provide access to affordable music lessons.
          </h3>
          <p className="description">Forte's online platform matches eligible school students with experienced musicians to facilitate affordable lessons,
          offering rates less than half that of standard private instruction. Prospective students and teachers apply for our program online via an application
          including their contact information, eligibility details, musical experience and goals. Based on their personal preferences and needs, Forte proposes
          matches among accepted students and teachers with the aim of establishing weekly lessons typically held at either the student or teacher's home.</p>
          <div className="question-container">
            <a className={`question ${this.state.teachers ? 'open' : ''}`}
               onClick={() => this.handleQuestion('teachers')}>
              Who are our teachers?
            </a>
            {this.state.teachers && this.renderAnswer('teachers')}
            <a className={`question ${this.state.students ? 'open' : ''}`}
               onClick={() => this.handleQuestion('students')}>
              Who are our students?
            </a>
            {this.state.students && this.renderAnswer('students')}
            <a className={`question ${this.state.underserved ? 'open' : ''}`}
               onClick={() => this.handleQuestion('underserved')}>
              What do we mean by 'underserved'?
            </a>
            {this.state.underserved && this.renderAnswer('underserved')}
            <a className={`question ${this.state.pricing ? 'open' : ''}`}
               onClick={() => this.handleQuestion('pricing')}>
              How does our pricing work?
            </a>
            {this.state.pricing && this.renderAnswer('pricing')}
            <a className={`question ${this.state.payments ? 'open' : ''}`}
               onClick={() => this.handleQuestion('payments')}>
              How do payments work?
            </a>
            {this.state.payments && this.renderAnswer('payments')}
            <a className={`question ${this.state.reschedule ? 'open' : ''}`}
               onClick={() => this.handleQuestion('reschedule')}>
              What if I can't make it to a scheduled lesson?
            </a>
            {this.state.reschedule && this.renderAnswer('reschedule')}
            <a className={`question ${this.state.instruments ? 'open' : ''}`}
               onClick={() => this.handleQuestion('instruments')}>
              What instruments do we offer lessons for?
            </a>
            {this.state.instruments && this.renderAnswer('instruments')}
            <a className={`question ${this.state.safety ? 'open' : ''}`}
               onClick={() => this.handleQuestion('safety')}>
              What safety standards do we maintain?
            </a>
            {this.state.safety && this.renderAnswer('safety')}
            <a className={`question ${this.state.resources ? 'open' : ''}`}
               onClick={() => this.handleQuestion('resources')}>
              What if I don't have an instrument?
            </a>
            {this.state.resources && this.renderAnswer('resources')}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

class MatchedLessons extends React.Component {

  static get propTypes() {
    return {
      matching: React.PropTypes.object.isRequired,
      student: React.PropTypes.object.isRequired,
      teacher: React.PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      pastLessons: [],
      upcomingLessons: [],
      tab: "past",
      showCancelModal: false,
    };

    this.fetchUpcomingLessons = this.fetchUpcomingLessons.bind(this);
  }

  componentDidMount() {
    this.fetchPastLessons();
    this.fetchUpcomingLessons();
  }

  fetchPastLessons() {
    const { matching } = this.props;

    const route = ApiConstants.matchings.pastLessons(matching.id);
    const resolve = (response) => this.setState({ pastLessons: response, });
    const reject = (response) => console.log(response);

    Requester.get(route, resolve, reject);
  }

  fetchUpcomingLessons() {
    const { matching } = this.props;

    const route = ApiConstants.matchings.upcomingLessons(matching.id);
    const resolve = (response) => this.setState({ upcomingLessons: response, });
    const reject = (response) => console.log(response);

    Requester.get(route, resolve, reject);
  }

  switchTab(nextTab) {
    this.setState({ tab: nextTab, });
  }

  renderPastTable() {
    const { pastLessons } = this.state;
    let items;

    if (pastLessons) {
      items = pastLessons.map((lesson, key) => {
        return <MatchingPastLessonRow lesson={lesson} key={key} />
      })
    }

    return (
      <table className="interactive matched-lesson-table">
        <thead id="table-head">
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Paid</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          { items }
        </tbody>
      </table>
    )
  }

  renderUpcomingTable() {
    const { upcomingLessons } = this.state;
    let items;

    if (upcomingLessons) {
      items = upcomingLessons.map((lesson, key) => {
        return (
          <MatchingUpcomingLessonRow lesson={lesson} key={key}
            fetch={this.fetchUpcomingLessons}/>
        )
      })
    }

    return (
      <table className="interactive matched-lesson-table">
        <thead id="table-head">
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Price</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          { items }
        </tbody>
      </table>
    )
  }

  renderSummary() {
    const { student, teacher } = this.props;

    let studentName = `${student.first_name} ${student.last_name}`;
    let teacherName = `${teacher.first_name} ${teacher.last_name}`;

    return (
      <div className="matching-summary">
        <div className="matching-summary-item">
          <div className="label">Student</div>
          <h4 className="info">{studentName}</h4>
        </div>
        <div className="matching-summary-item">
          <div className="label">Teacher</div>
          <h4 className="info">{teacherName}</h4>
        </div>
        <div className="matching-summary-item">
          <div className="label">Instrument</div>
          <h4 className="info">{this.props.matching.instrument}</h4>
        </div>
      </div>
    )
  }

  render() {
    let lessons, tableView;
    let  { tab } = this.state;

    if (tab == "past") {
      tableView = this.renderPastTable();
    } else {
      tableView = this.renderUpcomingTable();
    }

    return (
      <div className="page-wrapper">
        <AdminHeader />
        <div className="content-wrapper matched-lessons-page">
          <h1>Matching Lessons</h1>
          {this.renderSummary()}
          <div>
            <ButtonGroup className="matched-lessons-tab">
              <Button onClick={this.switchTab.bind(this, 'past')}
                className={tab == "past" ? "active" : ""}>
                Past Lessons
              </Button>
              <Button onClick={this.switchTab.bind(this, 'upcoming')}
                className={tab == "upcoming" ? "active" : ""}>
                Upcoming Lessons
              </Button>
            </ButtonGroup>
            { tableView }
          </div>
        </div>
      </div>
    );
  }
}

class MatchingPastLessonRow extends React.Component {

  render() {
    const { lesson } = this.props;
    const start = moment(lesson.start_time);
    const price = `$${parseFloat(lesson.price).toFixed(2)}`;

    return (
      <tr>
        <td>{start.format("LL")}</td>
        <td>{start.format("h:mm a")}</td>
        <td>{lesson.is_paid ? "Yes" : "No"}</td>
        <td>{price}</td>
      </tr>
    );
  }
}

class MatchingUpcomingLessonRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showCancelModal: false,
      showRescheduleModal: false,
    };
  }

  openCancelModal() { this.setState({ showCancelModal: true }); }
  closeCancelModal() { this.setState({ showCancelModal: false }); }
  openRescheduleModal() { this.setState({ showRescheduleModal: true }); }
  closeRescheduleModal() { this.setState({ showRescheduleModal: false }); }

  renderCancelModal(lesson) {
    const { showCancelModal } = this.state;

    if (showCancelModal) {
      return (
        <CancelModal
          lesson={lesson}
          handleClose={() => this.closeCancelModal()}
          fetchUpcomingLessons={this.props.fetch}
          isStudent={false}
        />
      );
    }
  }

  renderRescheduleModal(lesson) {
    const { showRescheduleModal } = this.state;

    if (showRescheduleModal) {
      return (
        <RescheduleModal
          lesson={lesson}
          handleClose={() => this.closeRescheduleModal()}
          fetchUpcomingLessons={this.props.fetch}
          isStudent={false}
        />
      );
    }
  }

  render() {
    const { lesson } = this.props;
    const start = moment(lesson.start_time);
    const price = `$${parseFloat(lesson.price).toFixed(2)}`;

    return (
      <tr>
        <td>{start.format("LL")}</td>
        <td>{start.format("h:mm a")}</td>
        <td>{price}</td>
        <td>
          <Button bsStyle="link" className="matched-lessons-button"
            onClick={this.openCancelModal.bind(this)}>Cancel
          </Button>
          <Button bsStyle="link" className="matched-lessons-button"
            onClick={this.openRescheduleModal.bind(this)}>Reschedule
          </Button>
          {this.renderCancelModal(lesson)}
          {this.renderRescheduleModal(lesson)}
        </td>
      </tr>
    );
  }
}

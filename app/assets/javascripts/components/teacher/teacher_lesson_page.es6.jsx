class TeacherLessonsPage extends React.Component {

  static get propTypes() {
    return {
      teacherId: React.PropTypes.number.isRequired,
    };
  }

  constructor() {
    super();
    this.state = {
      filter: "upcoming",
      upcomingLessons: null,
      recentLessons: null,
      matchings: null,
    };
  }

  componentWillMount() {
    this.fetchMatchings();
    this.fetchUpcomingLessons();
    this.fetchRecentLessons();
  }

  fetchMatchings() {
    const { teacherId } = this.props;
    const route = ApiConstants.teachers.matchings(teacherId);
    const resolve = (response) => this.setState({ matchings: response.matchings });
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  fetchUpcomingLessons() {
    const { teacherId } = this.props;
    const route = ApiConstants.teachers.upcomingLessons(teacherId);
    const resolve = (response) => this.setState({ upcomingLessons: response.lessons });
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  fetchRecentLessons() {
    const { teacherId } = this.props;
    const route = ApiConstants.teachers.recentLessons(teacherId);
    const resolve = (response) => this.setState({ recentLessons: response.lessons });
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  handleClick(filter) {
    this.setState({ filter: filter });
  }

  renderOption(option) {
    const { filter } = this.state;
    switch (option) {
      case "upcoming":
        style = (filter === "upcoming" ?
                  "lesson-tab tab--active" :
                  "lesson-tab"
                );
        buttonText = "Upcoming Lessons";
        break;
      case "recent":
        style = (filter === "recent" ?
                  "lesson-tab tab--active" :
                  "lesson-tab"
                );
        buttonText = "Recent Lessons";
        break;
    }
    return (
      <button
        className={style}
        onClick={() => this.handleClick(option)}
      >
        {buttonText}
      </button>
    );
  }

  renderLessonCard(lesson) {
    return (
      <LessonCard
        isStudent={false}
        fetchLessons={() => this.fetchUpcomingLessons()}
        lesson={lesson} />
    );
  }

  renderLessonCards(filter) {
    const { upcomingLessons, recentLessons } = this.state;

    if (filter === "upcoming" && upcomingLessons) {
      return upcomingLessons.map((lesson) => this.renderLessonCard(lesson));
    } else {
      if (recentLessons) {
        return recentLessons.map((lesson) => this.renderLessonCard(lesson));
      }
    }
  }

  render() {
    const { filter, matchings } = this.state;
    const name = getCookie('name');

    return (
     <div className="page-wrapper">
      <UserHeader />
      <div className="lessons-page teacher-lessons-page content-wrapper">
       {this.state.matchings && this.state.matchings.length > 0 ? (
        <div>
          <h2 className="title">
            My Lessons
          </h2>
          <div className="options-container lesson-tabs">
            {this.renderOption("upcoming")}
            {this.renderOption("recent")}
          </div>
          {this.renderLessonCards(filter)}
        </div>
      ) : (
        <div className="empty-state-container">
          <Glyphicon glyph="music" className="music-icon" />
          <h3>Hi {name}! Thank you for signing up with us!</h3>
          <h4>When Forte admins match you with suitable students, your lesson information will appear here.</h4>
        </div>
      )}
      </div>
    </div>
    );
  }
}

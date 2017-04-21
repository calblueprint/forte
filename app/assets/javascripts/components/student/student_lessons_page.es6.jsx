class StudentLessonsPage extends React.Component {

  static get propTypes() {
    return {
      studentId: React.PropTypes.number.isRequired,
    };
  }

  constructor() {
    super();
    this.state = {
      filter: "upcoming",
      upcomingLessons: null,
      recentLessons: null,
      matchings: null,
      showFeedbackModal: false,
    };
  }

  componentWillMount() {
    this.fetchMatchings();
    this.fetchUpcomingLessons();
    this.fetchRecentLessons();
  }
   
  fetchMatchings() {
    const { studentId } = this.props;
    const route = ApiConstants.students.matchings(studentId);
    const resolve = (response) => this.setState({ matchings: response.matchings });
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  fetchUpcomingLessons() {
    const { studentId } = this.props;
    const route = ApiConstants.students.upcomingLessons(studentId);
    const resolve = (response) => this.setState({ upcomingLessons: response.lessons });
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  fetchRecentLessons() {
    const { studentId } = this.props;
    const route = ApiConstants.students.recentLessons(studentId);
    const resolve = (response) =>
      this.setState({ recentLessons: response.lessons }, () => {
        this.openFeedbackModal();
      });
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  openFeedbackModal() {
    // Check cache
    const shown = JSON.parse(localStorage.getItem("shownModal"));
    const storedRecent = JSON.parse(localStorage.getItem("recentLesson"));
    const mostRecent = this.state.recentLessons[0];

    // If no recent lessons or not a student, don't show modal
    if (!mostRecent || !this.props.studentId) { return; }

    if (!(storedRecent == mostRecent.id) && !shown) {
      this.setState({ showFeedbackModal: true });
      localStorage.setItem("recentLesson", mostRecent.id);
      localStorage.setItem("shownModal", true);
    }
  }

  closeFeedbackModal() {
    this.setState({ showFeedbackModal: false });
  }

  renderFeedbackModal() {
    const { studentId } = this.props;
    if (this.state.showFeedbackModal) {
      return (
        <FeedbackModal
          handleClose={() => this.closeFeedbackModal()}
          lesson={this.state.recentLessons[0]}
          studentId={studentId}
          fetchRecentLessons={() => this.fetchRecentLessons()}
        />
      )
    }
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
        onClick={() => this.handleClick(option)} >
        {buttonText}
      </button>
    );
  }

  renderLessonCard(lesson, is_last_lesson) {
    return (
      <LessonCard
        isStudent={true}
        studentId={this.props.studentId}
        fetchUpcomingLessons={() => this.fetchUpcomingLessons()}
        fetchRecentLessons={() => this.fetchRecentLessons()}
        lesson={lesson}
        is_last_lesson={is_last_lesson} />
    );
  }

  renderLessonCards(filter) {
    const { upcomingLessons, recentLessons } = this.state;
    if (filter === "upcoming" && upcomingLessons) {
      var lessonCards = [];
      for (var i = 0; i < upcomingLessons.length; i++) {
        var is_last_lesson = false;
        if (i == upcomingLessons.length - 1) {
          is_last_lesson = true;
        }
        lessonCards.push(this.renderLessonCard(upcomingLessons[i], is_last_lesson));
      }
      return lessonCards;
    } else {
      if (recentLessons) {
        return recentLessons.map((lesson) => this.renderLessonCard(lesson, false));
      }
    }
  }

  render() {
    const { filter, matchings } = this.state;
    const name = getCookie('name');

    return (
     <div className="page-wrapper">
      <UserHeader />
      <div className="lessons-page student-lessons-page content-wrapper">
      {this.state.matchings && this.state.matchings.length > 0 ? (
        <div>
          {this.renderFeedbackModal()}
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
        </div>
      ) : (
        <div className="empty-state-container">
          <Glyphicon glyph="music" className="music-icon" />
          <h3>Hi {name}! Thank you for signing up with us!</h3>
          <h4>When Forte admins match you with a suitable teacher, your lesson information will appear here.</h4>
        </div>
      )}
      </div>
    </div>
    );
  }
}

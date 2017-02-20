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
      showFeedbackModal: false,
    };
  }

  componentDidMount() {
    this.fetchUpcomingLessons();
    this.fetchRecentLessons();
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

  renderLessonCard(lesson) {
    return (
      <LessonCard
        isStudent={true}
        studentId={this.props.studentId}
        fetchUpcomingLessons={() => this.fetchUpcomingLessons()}
        fetchRecentLessons={() => this.fetchRecentLessons()}
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
    const { filter } = this.state;
    return (
     <div className="page-wrapper">
      <UserHeader />
      {this.renderFeedbackModal()}
      <div className="lessons-page student-lessons-page content-wrapper">
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
    );
  }
}

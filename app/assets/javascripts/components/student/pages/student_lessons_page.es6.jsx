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
      lessons: null,
    };
  }

  componentDidMount() {
    this.fetchLessons();
  }

  fetchLessons() {
    const { studentId } = this.props;
    const route = ApiConstants.students.upcomingLessons(studentId);
    const reject = (response) => console.log(response);
    const resolve = (response) => this.setState({ lessons: response.lessons });
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
    switch (option) {
      case "upcoming":
        style = (this.state.filter == "upcoming" ?
                  "button button--lg button--solid-orange" :
                  "button button--lg button--solid-white"
                );
        buttonText = "Upcoming Lessons";
        break;
      case "recent":
        style = (this.state.filter == "recent" ?
                  "button button--lg button--solid-orange" :
                  "button button--lg button--solid-white"
                );
        buttonText = "Recent Lessons";
        break;
    }
    return (
      <Button
        className={style}
        onClick={() => this.handleClick(option)}
      >
        {buttonText}
      </Button>
    );
  }

  render() {
    return (
     <div className="page-wrapper">
      <UserHeader />
      <div className="student-lessons-page content-wrapper">
        <h2 className="title">
          My Lessons
        </h2>
        <div className="options-container">
          <ButtonGroup>
            {this.renderOption("upcoming")}
            {this.renderOption("recent")}
          </ButtonGroup>
        </div>
        <LessonCard
          lessons={this.state.lessons}
        />
      </div>
    </div>
    );
  }
}

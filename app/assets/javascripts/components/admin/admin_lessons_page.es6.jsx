class AdminLessonsPage extends React.Component {

  static get propTypes() {
    return {
      lessons: React.PropTypes.array,
    };
  }

  constructor(props) {
    super();
    this.state = {
      person: null,
    };
  }

  renderLesson(lesson) {
    return (
      <LessonItem lesson={lesson} />
    );
  }

  renderLessons() {
    return this.props.lessons.map((lesson) => this.renderLesson(lesson));
  }

  render () {
    return (
      <div className="page-wrapper admin-lessons-page container">
        <AdminHeader />
        <div className="content-wrapper lesson-content-wrapper">
          <h1>Lessons</h1>
          <div className="lessons-container">
            {this.renderLessons()}
          </div>
        </div>
      </div>
    );
  }
}

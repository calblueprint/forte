class AdminLessonsPage extends React.Component {

  static get propTypes() {
    return {
      lessons: React.PropTypes.array,
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
      <div className="page-wrapper">
        <AdminHeader />
        <div className="content-wrapper admin-lessons-page">
          <h1 className="lessons-title">Lessons</h1>
          <div className="lessons-container">
            {this.renderLessons()}
          </div>
        </div>
      </div>
    );
  }
}

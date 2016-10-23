class LessonsPage extends React.Component {

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
        <div className="content-wrapper">
          {this.renderLessons()}
        </div>
      </div>
    );
  }
}

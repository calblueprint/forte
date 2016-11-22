class AdminLessonsPage extends React.Component {

  static get propTypes() {
    return {
      lessons: React.PropTypes.array,
    };
  }

  constructor(props) {
    super();
    this.state = {
      showPersonModal: false,
      person: null,
    };
  }

  renderLesson(lesson) {
    return (
      <LessonItem lesson={lesson} onPersonClick={(person) => this.onPersonClick(person)}/>
    );
  }

  onPersonClick(student) {
    console.log(student)
    this.setState({ showPersonModal: true, person: student })
  }

  closePersonModal() {
    this.setState({ showPersonModal: false, person: null });
  }

  renderPersonModal() {
    const { showPersonModal } = this.state;
    if (showPersonModal == true) {
      return (
        <PersonModal handleClose={() => this.closePersonModal()} person={this.state.person} />
      );
    }
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
        {this.renderPersonModal()}
      </div>
    );
  }
}

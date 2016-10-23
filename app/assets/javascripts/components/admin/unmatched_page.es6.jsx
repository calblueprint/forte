class UnmatchedPage extends React.Component {

  constructor(props) {
    super(props);
    this.setState({"student_detail": false, "teacher_detail": true});
  }

  static get PropTypes() {
    return {
      students: React.PropTypes.array,
    };
  }

  renderStudentPart() {
    if (this.state.student_detail) {
      return (
        <div>
          <p>STUDENT DETAIL</p>
          <FullStudent student={this.state.student} />
        </div>
      );
    } else {
      return (
        <div>
          <p>STUDENT LIST</p>
          <PersonList people={this.state.students} />
        </div>
      );
    }
  }

  renderTeacherPart() {
    if (this.state.teacher_detail) {
      return (
        <div>
          <p>TEACHER DETAIL</p>
          <FullTeacher teacher={this.state.teacher} />
        </div>
      );
    } else if (this.props.student_detail) {
      return (
        <div>
          <p>TEACHER LIST</p>
          <PersonList people={this.state.teachers} />
        </div>
      );
    } else {
      return (
        <div>
          <p>TEACHER BLANK LIST</p>
          <PersonList people={[]} />
        </div>
      );
    }
  }

  render () {
    return (
      <div className="page-wrapper">
        <AdminHeader />
        <div className="content-wrapper">
          {this.renderStudentPart()}
          {this.renderTeacherPart()}
        </div>
      </div>
    );
  }
}


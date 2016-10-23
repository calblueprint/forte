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
      if (this.state.student != null) {
        return (
          <div>
            <p>STUDENT DETAIL</p>
            <FullStudent student={this.state.student} />
          </div>
        );
      } else {
        return (
          <div>
          </div>
        );
      }
    } else {
      if (this.state.students != null) {
        return (
          <div>
            <p>STUDENT LIST</p>
            <PersonList people={this.state.students} />
          </div>
        );
      } else {
        return (
          <div>
          </div>
        );
      }
    }
  }

  renderTeacherPart() {
    if (this.state.teacher_detail) {
      if (this.state.teacher != null) {
        return (
          <div>
            <p>TEACHER DETAIL</p>
            <FullTeacher teacher={this.state.teacher} />
          </div>
        );
      } else {
        return (
          <div>
          </div>
        );
      }
    } else if (this.props.student_detail) {
      if (this.state.teachers != null) {
        return (
          <div>
            <p>TEACHER LIST</p>
            <PersonList people={this.state.teachers}/>
          </div>
        );
      } else {
        return (
          <div>
          </div>
        );
      }
    } else {
      return (
        <div>
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


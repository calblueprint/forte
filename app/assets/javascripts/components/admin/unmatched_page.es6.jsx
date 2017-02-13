class UnmatchedPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      fullStudent: false,
      fullTeacher: false,
      students: null,
      teachers: null,
      student: null,
      teacher: null,
      instrument: null,
      showMatchingModal: false,
    };
  }

  componentDidMount() {
    this.loadStudents();
  }

  loadStudents() {
    var route = ApiConstants.students.unmatched;
    var resolve = (response) => this.setState({ students: response["students"] });
    var reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  studentOnClick(studentId, instrument) {
    var studentRoute = ApiConstants.students.show(studentId)
    var studentResolve = ((response) => {
      this.setState({
        fullStudent: true,
        student: response.student,
        instrument: instrument.name,
      });
      var teacherRoute = ApiConstants.teachers.possibleTeachers(studentId, instrument.name);
      var teacherResolve = (response) => this.setState({ teachers: response["teachers"] });
      var teacherReject = (response) => console.log(response);
      Requester.get(
        teacherRoute,
        teacherResolve,
        teacherReject,
      );
    }).bind(this);
    var studentReject = (response) => console.log(response);
    Requester.get(
      studentRoute,
      studentResolve,
      studentReject,
    );
  }

  teacherOnClick(teacher_id, instrument) {
    var route = ApiConstants.teachers.show(teacher_id)
    var resolve = (response) => this.setState({fullTeacher: true, teacher: response.teacher});
    var reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject
    );
  }

  studentBackButton(event) {
    this.setState({ fullStudent: false, fullTeacher: false });
  }

  teacherBackButton(event) {
    this.setState({ fullTeacher: false });
  }

  openMatchingModal(person) {
    this.setState({ showMatchingModal: true });
  }

  closeMatchingModal() {
    this.setState({ showMatchingModal: false });
  }

  renderMatchingModal() {
    const { showMatchingModal, student, teacher, instrument } = this.state;
    if (showMatchingModal) {
      return (
        <MatchingModal
          handleClose={() => this.closeMatchingModal()}
          student={student}
          teacher={teacher}
          instrument={instrument} />
      );
    }
  }

  renderStudentPart() {
    const { fullStudent, student, students, instrument } = this.state;
    const emptyPane = <div className="pane-container"/>;

    if (fullStudent) {
      if (student != null) {
        return (
          <div className="pane-container">
            <div className="pane-header">
              <div className="pane-name">
                <div className="back-button">
                  <Glyphicon glyph="chevron-left" className="back-button" onClick={(event) => this.studentBackButton(event)} />
                </div>
                <h2>{student.first_name} {student.last_name}</h2>
              </div>
              <h3 className="pane-description">Student</h3>
            </div>
            <div className="list-pane">
              <FullStudent student={student} instrument={instrument}/>
            </div>
          </div>
        );
      } else {
        return emptyPane;
      }
    } else {
      if (students != null) {
        return (
          <div className="pane-container">
            <div className="pane-header">
              <h2>Unmatched Students</h2>
            </div>
            <div className="list-pane">
            <PersonList
              people={students}
              isStudent={true}
              onPersonClick={(student, instrument) => this.studentOnClick(student, instrument)} />
          </div>
          </div>
        );
      } else {
        return emptyPane;
      }
    }
  }

  renderTeacherPart() {
    const { fullTeacher, fullStudent, teacher, teachers, instrument } = this.state;
    const emptyPane =
      <div className="pane-container">
        <div className="teacher-empty-state">
          <img src={this.props.emptyStateImg} alt="Empty state icon"/>
          <p>Select a student on the left to see available teachers!</p>
        </div>
      </div>

    if (fullTeacher) {
      if (teachers != null) {
        return (
          <div className="pane-container">
            <div className="pane-header">
              <div className="pane-name">
                <div className="back-button">
                  <Glyphicon glyph="chevron-left" className="back-button" onClick={(event) => this.teacherBackButton(event)} />
                </div>
                <h2>{teacher.first_name} {teacher.last_name}</h2>
              </div>
              <h3 className="pane-description">Teacher</h3>
            </div>
            <div className="list-pane">
              <FullTeacher teacher={teacher} />
            </div>
          </div>
        );
      } else {
        return emptyPane;
      }
    } else if (fullStudent) {
      if (teachers != null) {
        return (
          <div className="pane-container">
            <div className="pane-header">
              <h2>Suitable {this.state.instrument} Teachers</h2>
            </div>
            <div className="list-pane">
              <PersonList
                people={teachers}
                isStudent={false}
                onPersonClick={(teacher, instrument) => this.teacherOnClick(teacher, instrument)} />
            </div>
          </div>
        );
      } else {
        return emptyPane;
      }
    } else {
      return emptyPane;
    }
  }

  render () {
    let footer;

    if (this.state.fullTeacher) {
      footer =
        <div className="pane-footer">
          <Button className="button button--solid-orange"
            onClick={() => this.openMatchingModal()}>Click to Match</Button>
        </div>
    }

    return (
      <div className="page-wrapper unmatched-page-wrapper">
        <AdminHeader />
        <div className="container">
          <div className="content-wrapper unmatched-page">
            {this.renderStudentPart()}
            <div className="divider" />
            {this.renderTeacherPart()}
            {footer}
          </div>
          {this.renderMatchingModal()}
        </div>
      </div>
    );
  }
}


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
        student: response,
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
    var resolve = (response) => this.setState({fullTeacher: true, teacher: response});
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

  makeMatching(event) {
    route = ApiConstants.matchings.create
    var params = {
      student_id: this.state.student.id,
      teacher_id: this.state.teacher.id,
      instrument: this.state.instrument
    };
    var resolve = (response) => {
      this.setState({ fullStudent: false, fullTeacher: false });
      this.loadStudents();
    };
    var reject = (response) => console.log(response);
    Requester.post(
      route,
      params,
      resolve,
      reject,
    );
  }

  renderStudentPart() {
    if (this.state.fullStudent) {
      if (this.state.student != null) {
        return (
          <div className="list-pane">
            <Glyphicon glyph="chevron-left" className="back-button" onClick={(event) => this.studentBackButton(event)} />
            <FullStudent student={this.state.student} instrument={this.state.instrument}/>
          </div>
        );
      } else {
        return (
          <div className="list-pane"/>
        );
      }
    } else {
      if (this.state.students != null) {
        return (
          <div className="list-pane">
            <h2>Unmatched Students</h2>
            <PersonList 
              people={this.state.students}
              isStudent={true} 
              onPersonClick={(student, instrument) => this.studentOnClick(student, instrument)} />
          </div>
        );
      } else {
        return (
          <div className="list-pane"/>
        );
      }
    }
  }

  renderTeacherPart() {
    if (this.state.fullTeacher) {
      if (this.state.teachers != null) {
        return (
          <div className="list-pane">
            <Glyphicon glyph="chevron-left" className="back-button" onClick={(event) => this.teacherBackButton(event)} />
            <FullTeacher teacher={this.state.teacher} />
            <Button className="button button--outline-orange" onClick={(event) => this.makeMatching(event)}>Match</Button>
          </div>
        );
      } else {
        return (
          <div className="list-pane"/>
        );
      }
    } else if (this.state.fullStudent) {
      if (this.state.teachers != null) {
        return (
          <div className="list-pane">
            <h2>Suitable Teachers</h2>
            <PersonList 
              people={this.state.teachers}
              isStudent={false}
              onPersonClick={(teacher, instrument) => this.teacherOnClick(teacher, instrument)} />
          </div>
        );
      } else {
        return (
          <div className="list-pane"/>
        );
      }
    } else {
      return (
        <div className="list-pane"/>
      );
    }
  }

  render () {
    return (
      <div className="page-wrapper">
        <AdminHeader />
        <div className="content-wrapper unmatched-page">
          {this.renderStudentPart()}
          <div className="divider" />
          {this.renderTeacherPart()}
        </div>
      </div>
    );
  }
}


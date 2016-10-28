class UnmatchedPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      student_detail: false,
      teacher_detail: false,
      students: null,
      teachers: null,
      student: null,
      teacher: null,
    }

    this.studentOnClick = this.studentOnClick.bind(this);
    this.teacherOnClick = this.teacherOnClick.bind(this);
    this.studentBackButton = this.studentBackButton.bind(this);
    this.teacherBackButton = this.teacherBackButton.bind(this);
    this.makeMatching = this.makeMatching.bind(this);
  }

  componentDidMount() {
    this.loadStudents()
  }

  loadStudents() {
    var studentRoute = ApiConstants.students.unmatched;
    var studentResolve = (response) => this.setState({students: response["students"]});
    var studentReject = (response) => console.log(response);

    Requester.get(
      studentRoute,
      studentResolve,
      studentReject,
    );
  }

  studentOnClick(student_id) {
    var studentRoute = ApiConstants.students.show(student_id)

    var studentResolve = ((response) => {
      this.setState({student_detail: true, student: response});

      var teacherRoute = ApiConstants.teachers.possible_teachers(student_id);
      var teacherResolve = (response) => this.setState({teachers: response["teachers"]});
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

  teacherOnClick(teacher_id) {
    var teacherRoute = ApiConstants.teachers.show(teacher_id)
    var teacherResolve = (response) => this.setState({teacher_detail: true, teacher: response});
    var teacherReject = (response) => console.log(response);
    Requester.get(
      teacherRoute,
      teacherResolve,
      teacherReject
    );
  }

  studentBackButton(event) {
    this.setState({student_detail: false, teacher_detail: false});
  }

  teacherBackButton(event) {
    this.setState({teacher_detail: false});
  }

  makeMatching(event) {
    route = ApiConstants.matchings.create
    var params = { 
      student_id: this.state.student.id, 
      teacher_id: this.state.teacher.id, 
      instrument: this.state.student.instrument
    };

    var resolve = (response) => {
      this.setState({student_detail: false, teacher_detail: false});
      this.loadStudents();
    }

    var reject = (response) => console.log(response);
    
    Requester.post(
      route,
      params,
      resolve,
      reject,
    );
  }

  renderStudentPart() {
    if (this.state.student_detail) {
      if (this.state.student != null) {
        return (
          <div>
            <p>STUDENT DETAIL</p>
            <Button className="button button--outline-orange" onClick={this.studentBackButton}>Back</Button>
            <FullStudent student={this.state.student}/>
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
            <PersonList people={this.state.students} onPersonClick={this.studentOnClick}/>
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
      if (this.state.teachers != null) {
        return (
          <div>
            <p>TEACHER DETAIL</p>
            <Button className="button button--outline-orange" onClick={this.teacherBackButton}>Back</Button>
            <FullTeacher teacher={this.state.teacher} />
            <Button className="button button--outline-orange" onClick={this.makeMatching}>Match</Button>
          </div>
        );
      } else {
        return (
          <div>
          </div>
        );
      }
    } else if (this.state.student_detail) {
      if (this.state.teachers != null) {
        return (
          <div>
            <p>TEACHER LIST</p>
            <PersonList people={this.state.teachers} onPersonClick={this.teacherOnClick}/>
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


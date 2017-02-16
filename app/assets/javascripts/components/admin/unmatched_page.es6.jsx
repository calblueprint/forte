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

  processGoogleMapsResponse(distances, teachers) {
    var none = 'I am not willing to travel';
    var fiveMiles = 'Up to 5 miles';
    var tenMiles = 'Up to 10 miles';
    var twentyMiles = 'Up to 20 miles';
    var moreThanTwenty = '20 miles or more';
    var milesToKilometers = 1.60934/100000;
    var travelDistances = {fiveMiles: 5*1.60934, tenMiles: 10*1.60934, twentyMiles: 20*1.60934}
    var validTeachers = []
    for (i = 0; i < teachers.length; i+=1) {
      var teacher = teachers[i];
      if (distances[i]["status"] == "OK") {
        var distance = distances[i]["distance"]["value"];
        var unlimited_travel = (teacher.travel_distance == moreThanTwenty) || (this.state.student.travel_distance == moreThanTwenty);
        var travel_within_constraint = (distance < travelDistances[teacher.travel_distance]) || (distance < travelDistances[this.state.student.travel_distance]);
        if (unlimited_travel || travel_within_constraint) {
          validTeachers.push(teacher);
        }
      }
    }
    return validTeachers
  }

  filterTeachersByDistance(teachers) {
    var destinations = [];
    for (i = 0; i < teachers.length; i+=1) {
      var teacher = teachers[i];
      destinations.push(teacher.full_address)
    }

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [this.state.student.full_address],
        destinations: destinations,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      }, googleMapsCallback.bind(this));

    function googleMapsCallback(response, status) {
      if (status == 'OK') {
        this.setState({ teachers: this.processGoogleMapsResponse(response["rows"][0]["elements"], teachers) });
      } else {
        console.log(response);
      }
    };
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
      var teacherResolve = (response) => this.filterTeachersByDistance(response["teachers"]);
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
    if (fullStudent) {
      if (student != null) {
        return (
          <div className="list-pane">
            <div className="pane-header">
              <div className="back-button">
                <Glyphicon glyph="chevron-left" className="back-button" onClick={(event) => this.studentBackButton(event)} />
              </div>
              <h2>{student.first_name} {student.last_name} - {instrument}</h2>
            </div>
            <FullStudent student={student} instrument={instrument}/>
          </div>
        );
      } else {
        return (
          <div className="list-pane"/>
        );
      }
    } else {
      if (students != null) {
        return (
          <div className="list-pane">
            <div className="pane-header">
              <h2>Unmatched Students</h2>
            </div>
            <PersonList 
              people={students}
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
    const { fullTeacher, fullStudent, teacher, teachers, instrument } = this.state;

    if (fullTeacher) {
      if (teachers != null) {
        return (
          <div className="list-pane">
            <div className="pane-header">
              <div className="back-button">
                <Glyphicon glyph="chevron-left" className="back-button" onClick={(event) => this.teacherBackButton(event)} />
              </div>
              <h2>{teacher.first_name} {teacher.last_name}</h2>
            </div>
            <FullTeacher teacher={teacher} />
            <div className="pane-footer">
              <Button className="button button--outline-orange" onClick={() => this.openMatchingModal()}>Choose</Button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="list-pane"/>
        );
      }
    } else if (fullStudent) {
      if (teachers != null) {
        return (
          <div className="list-pane">
            <div className="pane-header">
              <h2>Suitable Teachers</h2>
            </div>
            <PersonList 
              people={teachers}
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
        {this.renderMatchingModal()}
      </div>
    );
  }
}


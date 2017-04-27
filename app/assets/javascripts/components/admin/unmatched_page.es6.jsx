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
      loading: false,
    };
  }

  componentDidMount() {
    this.loadStudents();
  }

  /**
   * Loads all the unmatched students
   */
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

  /**
   * Load the roster based on which filter/search input is entered or selected.
   * @param distances Object distances object returned from google maps API call to apply distance logic.
   * @param teachers Array teachers array
   */
  processGoogleMapsResponse(distances, teachers) {
    var moreThanTwenty = '20 miles or more';
    var travelDistances = {'I am not willing to travel': 0, 'Up to 5 miles': 5, 'Up to 10 miles': 10, 'Up to 20 miles': 20}
    var validTeachers = []
    for (i = 0; i < teachers.length; i+=1) {
      var teacher = teachers[i];
      if (distances[i]["status"] == "OK") {
        var distance = distances[i]["distance"]["text"];
        distance = parseFloat(distance.substring(0, distance.length-3));
        var unlimited_travel = (teacher.travel_distance == moreThanTwenty) || (this.state.student.travel_distance == moreThanTwenty);
        var travel_within_constraint = (distance < travelDistances[teacher.travel_distance]) || (distance < travelDistances[this.state.student.travel_distance]);
        if (unlimited_travel || travel_within_constraint) {
          validTeachers.push(teacher);
        }
      }
    }
    return validTeachers;
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
        this.setState({
          teachers: this.processGoogleMapsResponse(response["rows"][0]["elements"], teachers),
          loading: false,
        });
      } else {
        this.setState({ loading: false });
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
        loading: true,
      });
      var teacherRoute = ApiConstants.teachers.possibleTeachers(studentId, instrument.name);
      var teacherResolve = (response) => this.filterTeachersByDistance(response["teachers"]);
      var teacherReject = (response) => this.setState({ loading: false });;
      Requester.get(
        teacherRoute,
        teacherResolve,
        teacherReject,
      );
    }).bind(this);
    var studentReject = (response) => this.setState({ loading: false });;
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
    this.setState({
      fullStudent: false,
      fullTeacher: false,
      teachers: null,
      instrument: null,
    });
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
    let footer, loadingContainer;

    if (this.state.loading) {
      loadingContainer = <div className="loading-container">
        <div className="loading"></div>
      </div>
    }

    if (this.state.fullTeacher) {
      footer =
        <div className="pane-footer">
          <Button className="button button--solid-orange"
            onClick={() => this.openMatchingModal()}>Click to Match</Button>
        </div>
    }

    return (
      <div className="page-wrapper unmatched-page-wrapper">
        {loadingContainer}
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


class ProfilePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isStudent: this.props.isStudent,
      currTab: 1,
      person: {},
    };
  }

  componentDidMount() {
    this.fetchProfile(this.props.id);
  }

  fetchProfile() {
    const { isStudent } = this.state;
    let route;

    if (this.state.isStudent) {
      route = ApiConstants.students.show(this.props.id);
    } else {
      route = ApiConstants.teachers.show(this.props.id);
    }

    const resolve = (response) => {
      if (isStudent) {
        this.setState({ person: response.student });
      } else {
        this.setState({ person: response.teacher });
      }
    }

    const reject = (response) => console.log(response);
    Requester.get(route, resolve, reject);
  }

  switchTab(num) {
    this.setState({ currTab: num, })
  }

  renderActiveView() {
    const { currTab, person } = this.state;

    if (currTab == 1) {
      return <StudentInformation student={person} />
    } else if (currTab == 2) {
      return <div>Nothing yet</div>
    }
  }

  renderQuickInfoBoxText() {
    const { person } = this.state;

    return (
      <div>
        <h3 className="box-label">Gender</h3>
        <p className="box-desc">{person.gender}</p>
        <h3 className="box-label">Student Email</h3>
        <p className="box-desc">{person.student_email}</p>
        <h3 className="box-label">City</h3>
        <p className="box-desc">{person.city}, {person.state}</p>
        <h3 className="box-label">School</h3>
        <p className="box-desc">{person.school}</p>
        <h3 className="box-label">Grade</h3>
        <p className="box-desc">{person.school_level}</p>
      </div>
    )
  }

  render() {
    const { person, isStudent, currTab } = this.state;
    const personType = isStudent ? "Student" : "Teacher";

    return (
      <div className="page-wrapper profile-page">
        <AdminHeader />
        <div className="profile-cover">
          <div className="cover-background">
            <div className="container">
              <div className="profile-pic"></div>
              <h1 className="profile-name">{person.full_name}
              </h1>
              <div className="person-type">{personType}</div>
            </div>
          </div>
          <div className="cover-tabs">
            <div className="container">
              <ul className="profile-tabs-container">
                <li className={"tab " + (currTab == 1 ? "active" : "inactive")}
                  onClick={() => this.switchTab(1)}>
                  {personType} Info</li>
                <li className={"tab " + (currTab == 2 ? "active" : "inactive")}
                  onClick={() => this.switchTab(2)}>
                  Lessons</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="profile-info">
          <div className="container">
            <div className="profile-quick-info-box">
              { this.renderQuickInfoBoxText() }
            </div>

            <div className="profile-detail-container">
              { this.renderActiveView() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

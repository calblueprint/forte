class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currTab: 1,
      person: {},
    };
  }

  componentDidMount() {
    this.fetchProfile(this.props.id);
  }

  fetchProfile() {
    const { isStudent } = this.props;
    let route;

    if (isStudent) {
      route = ApiConstants.students.show(this.props.id);
    } else {
      route = ApiConstants.teachers.show(this.props.id);
    }

    const resolve = (response) => {
      if (isStudent) {
        this.setState({ person: response.student });
      } else {
        console.log("response");
        console.log(response.teacher);
        this.setState({ person: response.teacher });
      }
    }

    const reject = (response) => console.log(response);
    Requester.get(route, resolve, reject);
  }

  switchTab(num) {
    this.setState({ currTab: num });
  }

  renderActiveView() {
    const { currTab, person } = this.state;
    let view;

    if (!person) { return; }

    switch(currTab) {
      case 1:
        if (this.props.isAdmin) {
          view = <div>Admin view for profile not implemented yet</div>

        } else if (this.props.isStudent) {
          view = <StudentSettingsPage
                   fetchProfile={this.fetchProfile.bind(this)}
                   id={this.props.id}
                   person={person} />
        } else {
          console.log("hi");
          console.log(person);
          view = <TeacherSettingsPage
                   fetchProfile={this.fetchProfile.bind(this)}
                   id={this.props.id}
                   person={person} />
        }
        break;

      case 2:
        view = <div>Nothing yet</div>
        break;
    }

    return view;
  }

  renderQuickInfoBoxText() {
    const { person } = this.state;
    const age = moment().diff(person.birthday, "years");

    return (
      <div>
        <div className="box-row">
          <div>
            <h3 className="box-label">Gender</h3>
            <p className="box-desc">{person.gender}</p>
          </div>
          <div>
            <h3 className="box-label">Age</h3>
            <p className="box-desc">{age} yrs.</p>
          </div>
        </div>
        <h3 className="box-label">Email</h3>
        <p className="box-desc">
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </p>
        <h3 className="box-label">City</h3>
        <p className="box-desc">{person.city}, {person.state}</p>
        <h3 className="box-label">School</h3>
        <p className="box-desc">{person.school}</p>
      </div>
    )
  }

  render() {
    const { person, currTab } = this.state;
    const { isStudent, isAdmin } = this.props;
    const personType = isStudent ? "Student" : "Teacher";
    let header = isAdmin ? <AdminHeader /> : <UserHeader />;
    let lessonTab;

    if (isAdmin) {
      lessonTab = (
        <li className={"tab " + (currTab == 2 ? "active" : "inactive")}
          onClick={() => this.switchTab(2)}>
          Lessons
        </li>
      )
    }

    return (
      <div className="page-wrapper profile-page">
        { header }
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
                { lessonTab }
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

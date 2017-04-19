class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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
        this.setState({ person: response.teacher });
      }
    }

    const reject = (response) => console.log(response);
    Requester.get(route, resolve, reject);
  }

  renderActiveView() {
    const { person } = this.state;
    const { isAdmin, isStudent, id } = this.props;
    let view;

    if (!person) { return; }

    if (isAdmin) {
      if (isStudent) {
        view = <StudentSettingsPage
                 fetchProfile={this.fetchProfile.bind(this)}
                 isAdmin={true}
                 person={person}
                 id={id} />
      } else {
        view = <TeacherSettingsPage
                 fetchProfile={this.fetchProfile.bind(this)}
                 isAdmin={true}
                 person={person}
                 id={id} />
      }

    } else {
      if (isStudent) {
        view = <StudentSettingsPage
                 fetchProfile={this.fetchProfile.bind(this)}
                 isAdmin={false}
                 person={person}
                 id={id} />
      } else {
        view = <TeacherSettingsPage
                 fetchProfile={this.fetchProfile.bind(this)}
                 isAdmin={false}
                 person={person}
                 id={id} />
      }
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
    const { person } = this.state;
    const { isStudent, isAdmin } = this.props;
    const personType = isStudent ? "Student" : "Teacher";
    let header = isAdmin ? <AdminHeader /> : <UserHeader />;

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
                <li className="tab active">{personType} Info</li>
                { /*  This space is here for future tab additions to profile page. */ }
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

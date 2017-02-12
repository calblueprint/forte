class RosterPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      people: null,
      showPersonModal: false,
      person: null,
      filter: "All",
    };
  }

  componentDidMount() {
    this.fetchPeople();
  }

  fetchPeople() {
    const route = ApiConstants.searchables.roster;
    const resolve = (response) => this.setState({ people: response.searchables });
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  onPersonClick(person) {
    this.setState({ showPersonModal: true, person: person });
  }

  closePersonModal() {
    this.setState({ showPersonModal: false, person: null });
  }

  filterByStudent() {
    this.setState({ filter: "Students" });

    const route = ApiConstants.students.index;
    const resolve = (response) => this.setState({ people: response.students });
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  filterByTeacher() {
    this.setState({ filter: "Teachers" });

    const route = ApiConstants.teachers.index;
    const resolve = (response) => this.setState({ people: response.teachers });
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  renderPersonModal() {
    const { showPersonModal } = this.state;
    if (showPersonModal == true) {
      return (
        <PersonModal
          handleClose={() => this.closePersonModal()}
          person={this.state.person} />
      );
    }
  }

  renderPeople() {
    return this.state.people.map((person) => {
      return <RosterItem person={person} onPersonClick={(person)=>this.onPersonClick(person)} />
    });
  }

  onSearchChange(event) {
    var input = $(event.target).val();
    if (input === "") {
      this.fetchPeople();
    } else {
      const route = ApiConstants.searchables.users(input);
      const resolve = (response) => this.setState({ people: response.searchables });
      const reject = (response) => console.log(response);
      Requester.get(
        route,
        resolve,
        reject,
      );
    }
  }

  renderFilterButton(label, onClick) {
    if (label == this.state.filter) {
      return (
        <Button className="button button--solid-orange" onClick={onClick}>{label}</Button>
      );
    } else {
      return (
        <Button className="button button--outline-orange" onClick={onClick}>{label}</Button>
      );
    }
  }

  render() {
    if (this.state.people == null) {
      return (
        <div />
      );
    } else {
      return (
        <div className="page-wrapper">
          <AdminHeader />
          <div className="content-wrapper roster-page">
            <h1 className="roster-title">Roster</h1>
             <FormGroup className="searchbar">
              <InputGroup>
                <FormControl
                  componentClass="input"
                  placeholder="Search"
                  name="first_name"
                  onChange={(event) => this.onSearchChange(event)}/>
                <InputGroup.Addon>
                  <Glyphicon glyph="search" />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <ButtonGroup className="filter-buttons">
              {this.renderFilterButton('All', (event) => this.fetchPeople())}
              {this.renderFilterButton('Students', (event) => this.filterByStudent())}
              {this.renderFilterButton('Teachers', (event) => this.filterByTeacher())}
            </ButtonGroup>
            <div className="roster-container">
              {this.renderPeople()}
            </div>
            {this.renderPersonModal()}
          </div>
        </div>
      );
    }
  }
}

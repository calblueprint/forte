class RosterPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      people: null,
      showPersonModal: false,
      person: null,
      filter: "All",
      searchInput: "",
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
    this.loadFilteredPeople(this.state.searchInput, "Students");
  }

  filterByTeacher() {
    this.setState({ filter: "Teachers" });
    this.loadFilteredPeople(this.state.searchInput, "Teachers");
  }

  filterByAll() {
    this.setState({ filter: "All" });
    this.loadFilteredPeople(this.state.searchInput, "All");
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

  renderPerson(person) {
    return (
      <div>
        <RosterItem person={person} onPersonClick={(person)=>this.onPersonClick(person)} />
        <div className="item-separator" />
      </div>
    );
  }

  renderPeople() {
    return this.state.people.map((person) => this.renderPerson(person));
  }

  onSearchChange(event) {
    var input = $(event.target).val();
    this.setState({ searchInput: input });
    this.loadFilteredPeople(input, this.state.filter);
  }

  loadFilteredPeople(input, filter) {
    if (input == "") {
      if (filter == "All") {
        this.fetchPeople();
      } else if (filter == "Teachers") {
        const route = ApiConstants.teachers.index;
        const resolve = (response) => this.setState({ people: response.teachers });
        const reject = (response) => console.log(response);
        Requester.get(
          route,
          resolve,
          reject,
        );
      } else if (filter == "Students") {
        const route = ApiConstants.students.index;
        const resolve = (response) => this.setState({ people: response.students });
        const reject = (response) => console.log(response);
        Requester.get(
          route,
          resolve,
          reject,
        );
      }
    } else {
      const route = ApiConstants.searchables.users(input, filter);
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
              {this.renderFilterButton('All', (event) => this.filterByAll())}
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

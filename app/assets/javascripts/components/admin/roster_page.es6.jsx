class RosterPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      people: null,
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
        <Button className="button button--solid-orange"
                onClick={onClick}>{label}</Button>
      );
    } else {
      return (
        <Button className="button button--outline-orange"
                onClick={onClick}>{label}</Button>
      );
    }
  }

  render() {
    let people;

    if (this.state.people == null) {
    } else {
      people = this.state.people.map((person, index) => {
        return <RosterTableRow person={person}
                               filter={this.state.filter}
                               key={index} />

      });
    }

    return (
      <div className="page-wrapper">
        <AdminHeader />
        <div className="content-wrapper roster-page container">
          <div className="roster-header">
            <h1 className="roster-title">Roster</h1>
            <div className="roster-header-controls">
              <ButtonGroup className="filter-buttons">
                {this.renderFilterButton('All', (event) => this.filterByAll())}
                {this.renderFilterButton('Students', (event) => this.filterByStudent())}
                {this.renderFilterButton('Teachers', (event) => this.filterByTeacher())}
              </ButtonGroup>
              <div className="searchbar">
                <input type="text" name="first_name" className="form-control"
                  onChange={(e) => this.onSearchChange(e)}
                  placeholder="Search for a person" />
              </div>
            </div>
          </div>
          <div className="roster-container">
            <table className="interactive roster-table">
              <thead id="table-head">
                <tr>
                  <th>Name</th>
                  <th hidden={this.state.filter != "All"}>Type</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Instrument</th>
                </tr>
              </thead>
              <tbody>
                {people}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

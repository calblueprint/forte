class RosterPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      hasResult: true,
      people: [],
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

  filter(type) {
    this.setState({
      filter: type,
      people: [],
    })

    this.loadFilteredPeople(this.state.searchInput, type);
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
        const resolve = (response) => {
          let hasResult = false;
          if (response.teachers.length != 0) {
            hasResult = true;
          }
          this.setState({
            people: response.teachers,
            hasResult: hasResult,
          });
        }
        const reject = (response) => console.log(response);
        Requester.get(
          route,
          resolve,
          reject,
        );
      } else if (filter == "Students") {
        const route = ApiConstants.students.index;
        const resolve = (response) => {
          let hasResult = false;
          if (response.students.length != 0) {
            hasResult = true;
          }
          this.setState({
            people: response.students,
            hasResult: hasResult,
          });
        }
        const reject = (response) => console.log(response);
        Requester.get(
          route,
          resolve,
          reject,
        );
      }

    } else {
      const route = ApiConstants.searchables.users(input, filter);
      const resolve = (response) => {
        let hasResult = false;
        if (response.searchables.length != 0) {
          hasResult = true;
        }
        this.setState({
          people: response.searchables,
          hasResult: hasResult,
        });
      }
      const reject = (response) => console.log(response);
      Requester.get(
        route,
        resolve,
        reject,
      );
    }
  }

  renderFilterButton(label) {
    let btnType = (label == this.state.filter) ? "solid" : "outline";

    return (
      <button className={`button filter-btn btn-${btnType}`}
              onClick={() => this.filter(label)}>{label}</button>
    )
  }

  render() {
    let people;

    if (this.state.people.length != 0) {
      people = this.state.people.map((person, index) => {
        return <RosterTableRow person={person}
                               filter={this.state.filter}
                               key={index} />

      });
    } else if (this.state.hasResult) {
      const span = this.state.filter == "All" ? 6 : 5;
      people = <tr>
                 <td className="roster-loading" colSpan={span}>
                     Loading...
                 </td>
               </tr>
    } else {
      const span = this.state.filter == "All" ? 6 : 5;
      people = <tr>
                 <td className="roster-loading" colSpan={span}>
                     No Results
                 </td>
               </tr>
    }

    return (
      <div className="page-wrapper">
        <AdminHeader />
        <div className="content-wrapper roster-page container">
          <div className="roster-header">
            <h1 className="roster-title">Roster</h1>
            <div className="roster-header-controls">
              <div className="filter-buttons">
                {this.renderFilterButton('All')}
                {this.renderFilterButton('Students')}
                {this.renderFilterButton('Teachers')}
              </div>
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

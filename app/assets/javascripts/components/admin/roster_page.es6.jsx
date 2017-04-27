class RosterPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      hasResult: true,
      people: [],
      filter: "All",
      searchInput: "",
      addAdminModal: false,
    };
  }

  componentDidMount() {
    this.fetchPeople();
  }

  /**
   * Fetch all the students and teachers
   */
  fetchPeople() {
    const route = ApiConstants.searchables.roster;
    const resolve = (response) => {
      this.setState({ people: response.searchables });
      console.log(response)
    }
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  /**
   * Changes the filter for the student/teacher
   */
  filter(type) {
    this.setState({
      filter: type,
      people: [],
    })

    this.loadFilteredPeople(this.state.searchInput, type);
  }

  /**
   * Changes the searchInput state when users type into the search box.
   * @param event Object React Event
   */
  onSearchChange(event) {
    var input = $(event.target).val();
    this.setState({ searchInput: input });
    this.loadFilteredPeople(input, this.state.filter);
  }

  /**
   * Load the roster based on which filter/search input is entered or selected.
   * @param input String search input from the search box
   * @param filter String either all/student/teacher
   */
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

  /**
   * Renders all the filter buttons
   * @param label String changes the outline of the button based on which filter is selected
   */
  renderFilterButton(label) {
    let btnType = (label == this.state.filter) ? "solid" : "outline";

    return (
      <button className={`button filter-btn btn-${btnType}`}
              onClick={() => this.filter(label)}>{label}</button>
    )
  }

  /**
   * Renders the add admin functionality.
   */
  renderAddAdminButton() {
    return (
      <Button className="add-admin-btn"
              onClick={() => this.openAddAdmin()}>Add Admin</Button>
    )
  }

  openAddAdmin() {
    this.setState({ addAdminModal: true });
  }

  closeAddAdmin() {
    this.setState({ addAdminModal: false });
  }

  /**
   * Renders the add admin modal
   */
  renderAddAdminModal() {
    const { addAdminModal } = this.state;
    if (addAdminModal) {
      return (
        <AddAdminModal handleClose = {() => this.closeAddAdmin() } />
      );
    }
  }

  render() {
    let people;

    if (this.state.people.length != 0) {
      people = this.state.people.map((person, index) => {
        return <RosterTableRow filter={this.state.filter}
                               person={person}
                               key={index}
                               fetchPeople={() => this.fetchPeople()} />

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
              <div className="add-admin-button">
                {this.renderAddAdminButton()}
                {this.renderAddAdminModal()}
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

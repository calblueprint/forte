class RosterPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      people: null,
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

  renderPerson(person) {
    return (
      <div>
        <RosterItem person={person} />
        <div className="item-separator" />
      </div>
    );
  }

  renderPeople() {
    return this.state.people.map((person) => this.renderPerson(person));
  }

  onSearchChange(event) {
    var input = $(event.target).val();
    if (input === "") {
      this.fetchPeople();
    } else {
      const route = ApiConstants.searchables.users(input);
      const resolve = (response) => this.setState({people: response.searchables });
      const reject = (response) => console.log(response);
      Requester.get(
        route,
        resolve,
        reject,
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
          <FormGroup>
            <FormControl 
              componentClass="input"  
              placeholder="Search"
              name="first_name"
              onChange={(event) => this.onSearchChange(event)}/>
          </FormGroup>
          <div className="content-wrapper roster-page">
            <h1 className="roster-title">Roster</h1>
            <div className="roster-container">
              {this.renderPeople()}
            </div>
          </div>
        </div>
      );
    }
  }
}

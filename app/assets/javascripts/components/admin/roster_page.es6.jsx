class RosterPage extends React.Component {
  
  static get propTypes() {
    return {
      people: React.PropTypes.array,  
    };
  }

  renderPerson(person) {
    return (
      <PersonItem person={person} />
    );
  }

  renderPeople() {
    return this.props.people.map((person) => this.renderPerson(person));
  }

  render () {
    return (
      <div className="page-wrapper">
        <AdminHeader />
        <div className="content-wrapper">
          {this.renderPeople()}
        </div>
      </div>
    );
  }
}

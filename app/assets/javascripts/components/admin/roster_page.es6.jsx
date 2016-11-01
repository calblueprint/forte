class RosterPage extends React.Component {
  
  static get propTypes() {
    return {
      people: React.PropTypes.array,  
    };
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
    return this.props.people.map((person) => this.renderPerson(person));
  }

  render () {
    return (
      <div className="page-wrapper">
        <AdminHeader />
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

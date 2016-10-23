class PersonList extends React.Component {

  static get PropTypes() {
    return {
      people: React.PropTypes.array,
    };
  }

  renderPerson(person) {
    return (
      <PersonDescription person={person} />
    );
  }

  renderPeople() {
    return this.props.people.map((person) => this.renderPerson(person));
  }

  render () {
    return (
      <div className="person-list">
        {this.renderPeople()}
      </div>
    );
  }
}

class PersonList extends React.Component {

  static get PropTypes() {
    return {
      people: React.PropTypes.array,
      onPersonClick: React.PropTypes.func
    };
  }

  renderPerson(person) {
    return (
      <PersonDescription person={person} key={person.id} onClick={this.props.onPersonClick}/>
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

class PersonDescription extends React.Component {

  static get PropTypes() {
    return {
      person: React.PropTypes.object,
    };
  }

  render () {
    return (
      <div className="person-description">
        <p>Name: { this.props.person.first_name } { this.props.person.last_name }</p>
        <p>City: { this.props.person.city }</p>
      </div>
    );
  }
}


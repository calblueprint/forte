class PersonDescription extends React.Component {

  static get PropTypes() {
    return {
      person: React.PropTypes.object,
      onClick: React.PropTypes.func
    };
  }

  render () {
    return (
      <div className="person-description" onClick={(event) => this.props.onClick(this.props.person.id)}>
        <p>Name: { this.props.person.first_name } { this.props.person.last_name }</p>
        <p>City: { this.props.person.city }</p>
      </div>
    );
  }
}


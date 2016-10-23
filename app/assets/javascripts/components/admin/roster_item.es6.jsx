class RosterItem extends React.Component {

  static get propTypes() {
    return {
      person: React.PropTypes.object, 
    };
  }

  render () {
    return (
      <div className="roster-item">
        <div>Name: {this.props.person.first_name} {this.props.person.last_name}</div>
        <div>ID: {this.props.person.id}</div>
        <div>Email: {this.props.person.email}</div>
      </div>
    );
  }
}


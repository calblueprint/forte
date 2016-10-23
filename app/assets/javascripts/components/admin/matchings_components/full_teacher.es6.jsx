class FullTeacher extends React.Component {

  static get PropTypes() {
    return {
      teacher: React.PropTypes.object,
    };
  }

  render () {
    return (
      <div className="full-teacher">
        <p>Name: { this.props.teacher.first_name } { this.props.teacher.last_name }</p>
        <p>City: { this.props.teacher.city }</p>
        <Button className="button button--outline-orange">Match</Button>
      </div>
    );
  }
}

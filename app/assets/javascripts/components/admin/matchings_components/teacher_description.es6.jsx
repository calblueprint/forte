class TeacherDescription extends React.Component {

  static get PropTypes() {
    return {
      teacher: React.PropTypes.object,
      onClick: React.PropTypes.func
    };
  }

  render () {
    return (
      <div className="person-description">
        <p>Name: { this.props.teacher.first_name } { this.props.teacher.last_name }</p>
        <p>City: { this.props.teacher.city }</p>
        <Button className="button button--outline-orange" onClick={(event) => this.props.onClick(this.props.teacher.id, null)}>See More</Button>
      </div>
    );
  }
}


class TeacherDescription extends React.Component {

  static get PropTypes() {
    return {
      teacher: React.PropTypes.object,
      onClick: React.PropTypes.func
    };
  }

  render () {
    const { teacher, onClick } = this.props;
    return (
      <div className="person-description">
        <p>Name: {teacher.first_name} {teacher.last_name}</p>
        <p>City: {teacher.city}</p>
        <Button className="button button--outline-orange" onClick={(event) => onClick(teacher.id, null)}>See More</Button>
      </div>
    );
  }
}


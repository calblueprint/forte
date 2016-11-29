class FullTeacher extends React.Component {

  static get PropTypes() {
    return {
      teacher: React.PropTypes.object,
    };
  }

  render () {
    const { teacher } = this.props
    return (
      <div className="full-person">
        <h2 className="name">{teacher.first_name} {teacher.last_name}</h2>
        <p>City: {teacher.city}</p>
        <Calendar 
          isEditable={false}
          events={availability_to_events(teacher.availability)} />
      </div>
    );
  }
}

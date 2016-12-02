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
        <TeacherInformation
          teacher={teacher} />
        <Calendar 
          isEditable={false}
          events={availability_to_events(teacher.availability)} />
      </div>
    );
  }
}

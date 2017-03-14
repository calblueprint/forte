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
          teacher={teacher}
          showCategory={true} />
        <h2 className="section-title">Availability</h2>
        <p>Note: Calendar is displayed in timezone <b>{teacher.timezone}</b></p>
        <Calendar
          isEditable={false}
          events={availability_to_events(teacher.availability, teacher.timezone)} />
      </div>
    );
  }
}

class FullStudent extends React.Component {

  static get PropTypes() {
    return {
      student: React.PropTypes.object,
      instrument: React.PropTypes.string,
    };
  }

  render () {
    const { student, instrument } = this.props;
    var studentAvail = student.availability.slice();
    return (
      <div className="full-person">
        <StudentInformation
          student={student}
          showCategory={true} />
        <h2 className="section-title">Availability</h2>
        <p>Note: Calendar is displayed in timezone <b>{student.timezone}</b></p>
        <Calendar
          isEditable={false}
          events={availability_to_events(studentAvail, student.timezone)} />
      </div>
    );
  }
}

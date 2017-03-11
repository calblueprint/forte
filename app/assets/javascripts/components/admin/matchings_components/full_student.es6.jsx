class FullStudent extends React.Component {

  static get PropTypes() {
    return {
      student: React.PropTypes.object,
      instrument: React.PropTypes.string,
    };
  }

  render () {
    const { student, instrument } = this.props;
    return (
      <div className="full-person">
        <StudentInformation
          student={student}
          showCategory={true} />
        <h2 className="section-title">Availability</h2>
        <Calendar
          isEditable={false}
          events={availability_to_events(student.availability, student.timezone)} />
      </div>
    );
  }
}

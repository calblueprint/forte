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
          student={student} />
        <Calendar 
          isEditable={false}
          events={availability_to_events(student.availability)} />
      </div>
    );
  }
}

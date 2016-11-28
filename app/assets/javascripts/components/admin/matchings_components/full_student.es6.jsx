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
        <h2 className="name">{student.first_name} {student.last_name}</h2>
        <p>City: {student.city}</p>
        <p>Instrument: {instrument}</p>
        <Calendar 
          isEditable={false}
          events={availability_to_events(student.availability)} />
      </div>
    );
  }
}

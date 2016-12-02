class FullStudent extends React.Component {

  static get PropTypes() {
    return {
      student: React.PropTypes.object,
      instrument: React.PropTypes.string,
    };
  }

  renderProperty(property) {
    var displayValue = property.replace("_", " ");
    return (
      <div><b>{displayValue}</b>: {this.props.student[property]}</div>
    );
  }
  
  renderProperties() {
    var properties = [];
    for (var property in this.props.student) {
      //TODO: Only display relevant information
      if (this.props.student.hasOwnProperty(property) && property!="unmatched_instruments") {
        properties.push(property);
      }
    }
    return properties.map((property) => this.renderProperty(property));
  }

  render () {
    const { student, instrument } = this.props;
    return (
      <div className="full-person">
        {this.renderProperties()}
        <Calendar 
          isEditable={false}
          events={availability_to_events(student.availability)} />
      </div>
    );
  }
}

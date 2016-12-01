class FullTeacher extends React.Component {

  static get PropTypes() {
    return {
      teacher: React.PropTypes.object,
    };
  }

  renderProperty(property) {
    var displayValue = property.replace("_", " ");
    return (
      <div><b>{displayValue}</b>: {this.props.teacher[property]}</div>
    );
  }
  
  renderProperties() {
    var properties = [];
    for (var property in this.props.teacher) {
      if (this.props.teacher.hasOwnProperty(property)) {
        properties.push(property);
      }
    }
    return properties.map((property) => this.renderProperty(property));
  }

  render () {
    const { teacher } = this.props
    return (
      <div className="full-person">
        {this.renderProperties()}
        <Calendar 
          isEditable={false}
          events={availability_to_events(teacher.availability)} />
      </div>
    );
  }
}

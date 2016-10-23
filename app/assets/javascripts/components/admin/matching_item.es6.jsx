class MatchingItem extends React.Component {
  
  static get propTypes() {
    return {
      matching: React.PropTypes.object, 
    };
  }

  render () {
    return (
      <div className="matching-item">
        <div>Student Name: {this.props.matching.student.first_name} {this.props.matching.student.last_name}</div>
        <div>Teacher Name: {this.props.matching.teacher.first_name} {this.props.matching.teacher.last_name}</div>
        <div>Instrument: {this.props.matching.matching.instrument}</div>
      </div>
    );
  }
}

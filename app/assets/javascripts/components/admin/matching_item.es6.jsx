class MatchingItem extends React.Component {

  static get propTypes() {
    return {
      matching: React.PropTypes.object,
      onPersonClick: React.PropTypes.func,
    };
  }

  render() {
    var startTime = moment(this.props.matching.matching.lesson_time[0]);
    return (
      <div className="matching-item">
        <div className="matching-item-header">
          {this.renderHeaderItem('Student', this.props.matching.student.first_name + ' ' + this.props.matching.student.last_name, (event) => this.props.onPersonClick(this.props.matching.student))}
          {this.renderHeaderItem('Teacher', this.props.matching.teacher.first_name + ' ' + this.props.matching.teacher.last_name, (event) => this.props.onPersonClick(this.props.matching.teacher))}
        </div>
        <div className="matching-item-content">
          {this.renderContentItem('Instrument', this.props.matching.matching.instrument)}
          {this.renderContentItem('Location', this.props.matching.matching.location, "matching-item-location")}
          {this.renderContentItem('Time', startTime.format('ddd') + ' ' + startTime.format('h:mm A').toUpperCase())}
        </div>
      </div>
    );
  }

  renderHeaderItem(label, text, onClick=null) {
    return (
      <div className="matching-item-header-item">
        <div className="header-label">{label}</div>
        <div className="header-text" onClick={onClick}>{text}</div>
      </div>
    );
  }

  renderContentItem(label, text, className="") {
    return (
      <div className={`matching-item-content-item ${className}`}>
        <div className="content-label">{label}</div>
        <div className="content-text">{text}</div>
      </div>
    );
  }
}

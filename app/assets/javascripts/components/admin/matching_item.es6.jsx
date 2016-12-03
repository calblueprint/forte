class MatchingItem extends React.Component {
  
  static get propTypes() {
    return {
      matching: React.PropTypes.object, 
    };
  }

  render() {
    var startTime = moment(this.props.matching.matching.lesson_time[0]);
    return (
      <div className="matching-item">
        <div className="matching-item-header">
          {this.renderHeaderItem('Student', this.props.matching.student.first_name + ' ' + this.props.matching.student.last_name)}
          {this.renderHeaderItem('Teacher', this.props.matching.teacher.first_name + ' ' + this.props.matching.teacher.last_name)}
        </div>
        <div className="matching-item-content">
          {this.renderContentItem('Instrument', this.props.matching.matching.instrument)}
          {this.renderContentItem('Location', this.props.matching.matching.location)}
          {this.renderContentItem('Time', startTime.format('ddd') + ' ' + startTime.format('h:mm A').toUpperCase())}
        </div>
      </div>
    );
  }

  renderHeaderItem(label, text) {
    return (
      <div className="matching-item-header-item">
        <div className="header-label">{label}</div>
        <div className="header-text">{text}</div>
      </div>
    );
  }

  renderContentItem(label, text) {
    return (
      <div className="matching-item-content-item">
        <div className="content-label">{label}</div>
        <div className="content-text">{text}</div>
      </div>
    );
  }
}

class LessonItem extends React.Component {

  static get propTypes() {
    return {
      lesson: React.PropTypes.object,
      onPersonClick: React.PropTypes.func,
    };
  }

  render () {
    const { lesson } = this.props
    return (
      <div className="lesson-item">
        <div className="lesson-item-header">
          {this.renderHeaderItem('Student', lesson.student.first_name + ' ' + lesson.student.last_name)}
          {this.renderHeaderItem('Teacher', lesson.teacher.first_name + ' ' + lesson.teacher.last_name)}
        </div>
        <div className="lesson-item-content">
          {this.renderContentItem('Time',
            lesson.start_time//.format('ddd') + ' ' + ''
            //lesson.start_time.format('h:mm A').toUpperCase() + ' - ' +
            //lesson.end_time.format('h:mm A').toUpperCase()
          )}
          {this.renderContentItem('Price', lesson.lesson.price)}
          {this.renderContentItem('Feedback', lesson.lesson.feedback)}
        </div>
      </div>
    );
  }

  renderHeaderItem(label, text) {
    return (
      <div className="lesson-item-header-item">
        <div className="header-label">{label}</div>
        <div className="header-text">{text}</div>
      </div>
    );
  }

  renderContentItem(label, text) {
    return (
      <div className="lesson-item-content-item">
        <div className="content-label">{label}</div>
        <div className="content-text">{text}</div>
      </div>
    );
  }
}

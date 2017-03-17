class LessonItem extends React.Component {

  static get propTypes() {
    return {
      lesson: React.PropTypes.object,
    };
  }

  render () {
    const { lesson } = this.props
    let startTime = moment(lesson.start_time);
    let endTime = moment(lesson.end_time);
    let studentName = `${lesson.student.first_name} ${lesson.student.last_name}`;
    let teacherName = `${lesson.teacher.first_name} ${lesson.teacher.last_name}`;

    return (
      <div className="lesson-item">
        <div className="lesson-item-header">
          {this.renderHeaderItem('Student', studentName, lesson.student.id)}
          {this.renderHeaderItem('Teacher', teacherName, lesson.teacher.id)}
        </div>
        <div className="lesson-item-content">
          {this.renderContentItem('Time',
            startTime.format('ddd') + ' ' +
            startTime.format('h:mm A').toUpperCase() + ' - ' +
            endTime.format('h:mm A').toUpperCase()
          )}
          {this.renderContentItem('Price', '$' + lesson.lesson.price)}
          {this.renderContentItem('Feedback', lesson.lesson.student_feedback)}
        </div>
      </div>
    );
  }

  renderHeaderItem(label, text, id) {
    let link;
    if (label == "Student") {
      link = RouteConstants.admin.studentProfile(id);
    } else {
      link = RouteConstants.admin.teacherProfile(id);
    }

    return (
      <a className="lesson-item-header-item" href={link}>
        <div>
          <div className="header-label">{label}</div>
          <div className="header-text">{text}</div>
        </div>
      </a>
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

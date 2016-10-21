class LessonItem extends React.Component {

  static get propTypes() {
    return {
      lesson: React.PropTypes.object,
    };
  }

  render () {
    return (
      <div className="lesson-card">
        <div>Teacher id: {this.props.lesson.teacher_id}</div>
        <div>Student id: {this.props.lesson.student_id}</div>
        <div>Start time: {this.props.lesson.start_time}</div>
        <div>End time: {this.props.lesson.end_time}</div>
        <div>Price: {this.props.lesson.price}</div>
      </div>
    );
  }
}

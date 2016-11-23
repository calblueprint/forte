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
        <div onClick={(event)=>this.props.onPersonClick(lesson.teacher)}>Teacher name: {lesson.teacher.first_name} {lesson.teacher.last_name}</div>
        <div onClick={(event)=>this.props.onPersonClick(lesson.student)}>Student name: {lesson.student.first_name} {lesson.student.last_name}</div>
        <div>Start time: {lesson.lesson.start_time}</div>
        <div>End time: {lesson.lesson.end_time}</div>
        <div>Price: {lesson.lesson.price}</div>
        <div>Feedback: {lesson.lesson.feedback}</div>
      </div>
    );
  }
}

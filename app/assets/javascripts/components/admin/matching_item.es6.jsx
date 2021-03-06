/**
 * @prop matching       - the given matching
 * @prop fetchMatchings - function to fetch all the matchings
 * @prop key            - unused prop
 */
class MatchingItem extends React.Component {

  static get propTypes() {
    return {
      matching: React.PropTypes.object.isRequired,
      fetchMatchings: React.PropTypes.func.isRequired,
      key: React.PropTypes.number,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      showDeleteModal: false,
      showEditModal: false,
      showLessonsModal: false,
    };
  }

  showEditModal() { this.setState({ showEditModal: true, }); }
  hideEditModal() { this.setState({ showEditModal: false, }); }
  showDeleteModal() { this.setState({ showDeleteModal: true, }); }
  hideDeleteModal() { this.setState({ showDeleteModal: false, }); }

  /**
   * Render the delete matching modal.
   */
  renderDeleteModal() {
    const { matching } = this.props;
    let studentName = `${matching.student.first_name} ${matching.student.last_name}`;
    let teacherName = `${matching.teacher.first_name} ${matching.teacher.last_name}`;

    if (this.state.showDeleteModal) {
      return (
        <DeleteMatchModal show={this.state.showDeleteModal}
          handleClose={this.hideDeleteModal.bind(this)}
          refetch={this.props.fetchMatchings}
          matching={matching.match_info}
          studentName={studentName}
          teacherName={teacherName} />
      )
    }
  }

  /**
   * Render the edit matching modal.
   */
  renderEditModal() {
    const { matching } = this.props;
    const { student, teacher } = matching;

    if (this.state.showEditModal) {
      return (
        <EditMatchModal show={this.state.showEditModal}
          handleClose={this.hideEditModal.bind(this)}
          refetch={this.props.fetchMatchings}
          matching={matching.match_info}
          student={student}
          teacher={teacher} />
      )
    }
  }

  render() {
    const { matching } = this.props;
    let startTime = number_to_moment(matching.match_info.lesson_time[0], matching.student.timezone);
    let studentName = `${matching.student.first_name} ${matching.student.last_name}`;
    let teacherName = `${matching.teacher.first_name} ${matching.teacher.last_name}`;
    let price = `$${parseFloat(matching.match_info.default_price).toFixed(2)}`;

    return (
      <div className="matching-item">
        <div className="matching-item-header">
          {this.renderHeaderItem('Student', studentName, matching.student.id)}
          {this.renderHeaderItem('Teacher', teacherName, matching.teacher.id)}
          {this.renderDropdownButton()}
        </div>
        <div className="matching-item-content">
          {this.renderContentItem('Instrument', matching.match_info.instrument)}
          {this.renderContentItem('Location', matching.match_info.location, "matching-item-location")}
          {this.renderContentItem('Time', startTime.format('ddd h:mm A'))}
          {this.renderContentItem('Price', price)}
        </div>
      </div>
    );
  }

  /**
   * Sets the new lesson times.
   * @param label String label of the content
   * @param text String text of the field.
   * @param id String id of the student/teacher
   */
  renderHeaderItem(label, text, id) {
    let link;
    if (label == "Student") {
      link = RouteConstants.admin.studentProfile(id);
    } else {
      link = RouteConstants.admin.teacherProfile(id);
    }

    return (
      <a className="matching-item-header-item" href={link}>
        <div>
          <div className="header-label">{label}</div>
          <div className="header-text">{text}</div>
        </div>
      </a>
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

  renderDropdownButton() {
    const { id } = this.props.matching.match_info;
    const lessonRoute = RouteConstants.admin.matchedLesson(id);

    return (
      <div className="matching-options">
        <DropdownButton bsStyle="link" title="Options" pullRight={true}>
          <MenuItem eventKey="1" onClick={() =>
            window.location = lessonRoute}>
            Show Lessons
          </MenuItem>
          <MenuItem eventKey="2"
            onClick={this.showEditModal.bind(this)}>Edit Matching</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="3"
            onClick={this.showDeleteModal.bind(this)}>Delete</MenuItem>
          {this.renderEditModal()}
          {this.renderDeleteModal()}
        </DropdownButton>
      </div>
    )
  }
}

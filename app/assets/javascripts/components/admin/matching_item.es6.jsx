class MatchingItem extends React.Component {

  static get propTypes() {
    return {
      matching: React.PropTypes.object,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      showDeleteModal: false,
      showEditModal: false,
    };
  }

  showEditModal() { this.setState({ showEditModal: true, }); }
  hideEditModal() { this.setState({ showEditModal: false, }); }
  showDeleteModal() { this.setState({ showDeleteModal: true, }); }
  hideDeleteModal() { this.setState({ showDeleteModal: false, }); }

  renderDeleteModal() {
    if (this.state.showDeleteModal) {
      return (
        <DeleteMatchModal show={this.state.showDeleteModal}
          handleClose={this.hideDeleteModal.bind(this)}
          matching={this.props.matching.matching} />
      )
    }
  }

  renderEditModal() {
    if (this.state.showEditModal) {
      return (
        <EditMatchModal show={this.state.showEditModal}
          handleClose={this.hideEditModal.bind(this)}
          matching={this.props.matching.matching} />
      )
    }
  }

  render() {
    const { matching } = this.props;
    let startTime = moment(this.props.matching.matching.lesson_time[0]);
    let studentName = `${matching.student.first_name} ${matching.student.last_name}`;
    let teacherName = `${matching.teacher.first_name} ${matching.teacher.last_name}`;

    return (
      <div className="matching-item">
        <div className="matching-item-header">
          {this.renderHeaderItem('Student', studentName, matching.student.id)}
          {this.renderHeaderItem('Teacher', teacherName, matching.teacher.id)}
          <DropdownButton bsStyle="link matching-options" title="Options">
            <MenuItem eventKey="1"
              onClick={this.showEditModal.bind(this)}>Edit Matching</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="2"
              onClick={this.showDeleteModal.bind(this)}>Delete</MenuItem>
            {this.renderEditModal()}
            {this.renderDeleteModal()}
          </DropdownButton>
        </div>
        <div className="matching-item-content">
          {this.renderContentItem('Instrument', this.props.matching.matching.instrument)}
          {this.renderContentItem('Location', this.props.matching.matching.location, "matching-item-location")}
          {this.renderContentItem('Time', startTime.format('ddd h:mm A'))}
          {this.renderContentItem('Price', `$${this.props.matching.matching.default_price}`)}
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
}

class TeacherDescription extends React.Component {

  static get PropTypes() {
    return {
      teacher: React.PropTypes.object,
      onClick: React.PropTypes.func
    };
  }

  render () {
    const { teacher, onClick } = this.props;
    return (
      <div className="person-description">
        <div className="person-detail">
          <div className="content-label">Name</div>
          <p className="content">{teacher.first_name} {teacher.last_name}</p>
        </div>
        <div className="person-detail">
          <div className="content-label">City</div>
          <p className="content">{teacher.city}</p>
        </div>

        <Button className="button button--outline-orange more-button" onClick={(event) => onClick(teacher.id, null)}>See Details</Button>
      </div>
    );
  }
}


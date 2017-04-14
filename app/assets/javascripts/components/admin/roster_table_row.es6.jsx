class RosterTableRow extends React.Component {

  static get propTypes() {
    return {
      filter: React.PropTypes.string,
      person: React.PropTypes.object,
      onPersonClick: React.PropTypes.func,
      fetchPeople: React.PropTypes.func,
    };
  }

  constructor(props) {
    super(props);

    /* Use the customer_id field to check whether the person is
       a student or a teacher. */
    this.state = {
      isStudent: this.props.person.customer_id ? true : false,
      showDeleteUserModal: false,
    }
  }

  linkToProfile() {
    const id = this.props.person.id;

    if (this.state.isStudent) {
      window.location = RouteConstants.admin.studentProfile(id);
    } else {
      window.location = RouteConstants.admin.teacherProfile(id);
    }
  }

  openDeleteUserModal() {
    this.setState({showDeleteUserModal: true});
  }

  closeDeleteUserModal() {
    this.setState({showDeleteUserModal: false});
  }

  renderDeleteUserModal(id, type) {
    const {showDeleteUserModal} = this.state;
    if (showDeleteUserModal) {
      return (
        <DeleteUserModal 
          id = {id}
          type = {type}
          handleClose = {() => this.closeDeleteUserModal()}
          refresh = {() => this.props.fetchPeople()} />
      );
    }
  }

  render () {
    const { person } = this.props;
    let personType = this.state.isStudent ? "Student" : "Teacher";

    return (
      <tr onClick={() => this.linkToProfile()}>
        <td className="name-col">
          <Glyphicon className="delete-user" glyph="remove"
            onClick={(e) => {e.stopPropagation(); this.openDeleteUserModal()}} />
            {this.renderDeleteUserModal(person.id, personType)}
          {person.first_name} {person.last_name}
        </td>
        <td hidden={this.props.filter !== "All"}>{personType}</td>
        <td>{person.gender}</td>
        <td>
          <a href={`mailto:${person.email}`}
             className="roster-table-email"
             onClick={(e) => e.stopPropagation()}>{person.email}</a>
        </td>
        <td>{person.city}, {person.state}</td>
        <td>{person.instrument}</td>
      </tr>
    );
  }
}

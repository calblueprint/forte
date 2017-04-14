class RosterTableRow extends React.Component {

  static get propTypes() {
    return {
      filter: React.PropTypes.string,
      person: React.PropTypes.object,
      fetchPeople: React.PropTypes.func,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      showDeleteUserModal: false,
    }
  }

  linkToProfile() {
    const id = this.props.person.id;
    const isStudent = this.props.person.customer_id ? true : false

    /* Use the customer_id field to check whether the person is
       a student or a teacher. */

    if (isStudent) {
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
    let personType = this.props.person.customer_id ? "Student" : "Teacher";

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

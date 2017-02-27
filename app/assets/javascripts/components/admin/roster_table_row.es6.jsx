class RosterTableRow extends React.Component {

  static get propTypes() {
    return {
      filter: React.PropTypes.string,
      person: React.PropTypes.object,
      onPersonClick: React.PropTypes.func,
    };
  }

  constructor(props) {
    super(props);

    /* Use the customer_id field to check whether the person is
       a student or a teacher. */
    this.state = {
      isStudent: this.props.person.customer_id ? true : false,
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

  render () {
    const { person } = this.props;
    let personType = this.state.isStudent ? "Student" : "Teacher";

    return (
      <tr onClick={() => this.linkToProfile()}>
        <td className="name-col">{person.first_name} {person.last_name}</td>
        <td hidden={this.props.filter !== "All"}>{personType}</td>
        <td>{person.gender}</td>
        <td>
          <a href={`mailto:${person.email}`}
             className="roster-table-email">{person.email}</a>
        </td>
        <td>{person.city}, {person.state}</td>
        <td>{person.instrument}</td>
      </tr>
    );
  }
}

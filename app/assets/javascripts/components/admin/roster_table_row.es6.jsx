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

  render () {
    const { person } = this.props;
    let personType = this.state.isStudent ? "Student" : "Teacher";

    return (
      <tr>
        <td className="name-col">{person.first_name} {person.last_name}</td>
        <td hidden={this.props.filter !== "All"}>{personType}</td>
        <td>{person.gender}</td>
        <td>{person.email}</td>
        <td>{person.city}, {person.state}</td>
        <td>{person.instrument}</td>
      </tr>
    );
  }
}

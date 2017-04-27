/**
 * @prop handleClose  - function to close the modal
 * @prop person       - either a student/teacher
 */
class PersonModal extends React.Component {

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func.isRequired,
      person: React.PropTypes.object.isRequired,
    };
  }

  /**
   * Render the information of the student/teacher
   */
  renderInformation() {
    const { person } = this.props;
    //TODO: better way to check if person is student/teacher
    if ('is_searching' in person) {
      return (
        <TeacherInformation
          teacher={person} />
      )
    } else {
      return (
        <StudentInformation
          student={person} />
      )
    }
  }

  render () {
    return(
      <Modal show={true} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.person.first_name} {this.props.person.last_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderInformation()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

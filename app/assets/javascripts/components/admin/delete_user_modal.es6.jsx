class DeleteUserModal extends React.Component {

  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      type: React.PropTypes.string.isRequired,
      id: React.PropTypes.number.isRequired,
      handleClose: React.PropTypes.func,
      refresh: React.PropTypes.func,
    };
  }

  deleteUser() {
    const { handleClose } = this.props;
    var reject = (response) => {
      toastr.error(response.message);
    };
    if (this.props.type == 'Student') {
      var route = ApiConstants.students.delete(this.props.id);
    } else if (this.props.type == 'Teacher') {
      var route = ApiConstants.teachers.delete(this.props.id);
    }
    var resolve = (response) => {
      this.props.refresh();
      toastr.success("User was successfully removed");
      handleClose();
    };
    Requester.delete(
      route,
      resolve,
      reject,
    );
  }

  render() {
    return(
      <Modal show={true} onHide={this.props.handleClose}>

        <Modal.Body>
          Are you sure you want to remove this user?
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="cancel-delete"
            onClick={this.props.handleClose}>Cancel</Button>
          <Button
            className="button--solid-orange"
            onClick={() => this.deleteUser()}>Delete</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

class DeleteMatchModal extends React.Component {

  static get propTypes() {
    return {
      show: React.PropTypes.boolean,
      handleClose: React.PropTypes.func,
      matching: React.PropTypes.object,
    };
  }

  handleDelete() {
    const { matching } = this.props;

    const route = ApiConstants.matchings.delete(matching.id);
    const resolve = (response) => {
      this.props.handleClose();
      toastr.success("Matching successfully deleted!");
    }
    const reject = (response) => console.log(response);

    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  render () {
    return(
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Matching</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this matching?
        </Modal.Body>
        <Modal.Footer>
          <Button className="button button--outline-orange button--left"
            onClick={this.props.handleClose}>Cancel</Button>
          <Button className="button button--solid-orange"
            onClick={this.props.handleClose}>Yes, Delete Matching</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

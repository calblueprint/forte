class EditMatchModal extends React.Component {

  static get propTypes() {
    return {
      show: React.PropTypes.boolean,
      handleClose: React.PropTypes.func,
      matching: React.PropTypes.object,
    };
  }

  renderInformation() {

  }

  render () {
    return(
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Matching</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button className="button button--outline-orange button--left"
            onClick={this.props.handleClose}>Cancel</Button>
          <Button className="button button--solid-orange"
            onClick={this.props.handleClose}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

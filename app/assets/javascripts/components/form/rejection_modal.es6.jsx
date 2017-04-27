/**
  * @prop handleClose - function to handle closing this modal
  */
class RejectionModal extends React.Component {

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func,
    };
  }

  render () {
    return(
      <Modal show={true} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Application Has Been Rejected</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your application has been rejected by Forte. This is because you have claimed that you have
          been convicted or plead guilty to a crime (other than minor traffic offenses)
          or have any criminal charges now pending against you.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

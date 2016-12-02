class RemoveInstrumentModal extends React.Component {

  constructor() {
    super();
    this.state = {
      showNextScreen: false,
    };
  }

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func.isRequired,
      instrument: React.PropTypes.object.isRequired,
      isVisible: React.PropTypes.bool.isRequired,
    };
  }

  handleNext() {
    this.setState({ showNextScreen: true });
  }

  handleConfirmClick() {
    const { instrument, handleClose} = this.props;

    const route = ApiConstants.instruments.delete(instrument.id);
    const resolve = (response) => {
      handleClose();
    }
    const reject = (response) => console.log(response);
    Requester.delete(
      route,
      resolve,
      reject,
    );
  }

  renderRemoveModal() {
    const { handleClose, instrument} = this.props;
    const { showNextScreen } = this.state;
    if (showNextScreen) {
      return (
        <div>
          <Modal.Body>
            <p>
              We will remove all lessons for {instrument.name}.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Close</Button>
            <Button className="button button--solid-orange" onClick={() => this.handleConfirmClick()}>Confirm</Button>
          </Modal.Footer>
        </div>
      );
    }
    else {
      return (
        <div>
          <Modal.Body>
            <p>Please confirm that you would like to remove {instrument.name} as one of your instruments.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Close</Button>
            <Button className="button button--solid-orange" onClick={() => this.handleNext()}>Next</Button>
          </Modal.Footer>
        </div>
      );
    }
  }

  render() {
    const { handleClose, isVisible } = this.props;

    return (
      <div>
        <Modal
          show={true}
          onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Remove Instrument</Modal.Title>
          </Modal.Header>
          {this.renderRemoveModal()}
        </Modal>
      </div>
    );
  }
}

class AddInstrumentModal extends React.Component {

  constructor() {
    super();
    this.state = {
      instrumentToAdd: null,
      proficiency: null,
      yearsPlayed: null,
      isPrimary: null,
    };
  }

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func.isRequired,
      fetchInstruments: React.PropTypes.func.isRequired,
      instrument: React.PropTypes.object.isRequired,
      instrumentable: React.PropTypes.object.isRequired,
      isVisible: React.PropTypes.bool.isRequired,
    };
  }

  handleConfirmClick() {
    const { instrument, handleClose, fetchInstruments, instrumentable } = this.props;
    const { instrumentToAdd, proficiency, yearsPlayed, isPrimary } = this.state;

    let instrumentable_type;
    if (getCookie('signed_in_type') == 'student') {
      instrumentable_type = 'Student';
    } else {
      instrumentable_type = 'Teacher';
    }

    const params = {
      instrument: {
        name: instrumentToAdd,
        instrumentable_type: instrumentable_type,
        proficiency: proficiency,
        years_played: yearsPlayed,
        is_primary: isPrimary,
        instrumentable_id: instrumentable.id,
      }
    };
    const route = ApiConstants.instruments.create;
    const resolve = (response) => {
      handleClose();
      fetchInstruments();
    }
    const reject = (response) => console.log(response);
    Requester.post(
      route,
      params,
      resolve,
      reject,
    );
  }

  renderAddModal() {
    const { handleClose } = this.props;
    const { instrumentToAdd, proficiency, yearsPlayed, isPrimary } = this.state;
    // TODO: Render the isPrimary text correctly.

    return (
      <div>
        <Modal.Body>
          <p>
            Which instrument would you like to add?
          </p>
          <DropdownButton
            title= { instrumentToAdd || "Instruments" }
            onSelect={(eventKey) => this.setState({ instrumentToAdd: eventKey })}>
            <MenuItem eventKey="Piano"> Piano </MenuItem>
            <MenuItem eventKey="Clarinet"> Clarinet </MenuItem>
            <MenuItem eventKey="Violin"> Violin </MenuItem>
          </DropdownButton>
          <DropdownButton
            title= { proficiency || "How proficient are you?" }
            onSelect={(eventKey) => this.setState({ proficiency: eventKey })}>
            <MenuItem eventKey='No Experience'> No Experience </MenuItem>
            <MenuItem eventKey='Beginner'> Beginner </MenuItem>
            <MenuItem eventKey='Intermediate'> Intermediate </MenuItem>
            <MenuItem eventKey='Advanced'> Advanced </MenuItem>
            <MenuItem eventKey='Professional'> Professional </MenuItem>
          </DropdownButton>
          <DropdownButton
            title= { yearsPlayed || "How many years of experience do you have? " }
            onSelect={(eventKey) => this.setState({ yearsPlayed: eventKey })}>
            <MenuItem eventKey='0'> 0 </MenuItem>
            <MenuItem eventKey='1'> 1 </MenuItem>
            <MenuItem eventKey='2'> 2 </MenuItem>
            <MenuItem eventKey='3'> 3 </MenuItem>
            <MenuItem eventKey='4'> 4 </MenuItem>
            <MenuItem eventKey='5'> 5 </MenuItem>
            <MenuItem eventKey='6'> 6+ </MenuItem>
          </DropdownButton>
          <DropdownButton
            title= { isPrimary || "Is this your primary instrument?" }
            onSelect={(eventKey) => this.setState({ isPrimary: eventKey })}>
            <MenuItem eventKey={true}> Yes </MenuItem>
            <MenuItem eventKey={false}> No </MenuItem>
          </DropdownButton>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button button--outline-orange" onClick={handleClose}>Close</Button>
          <Button className="button button--solid-orange" onClick={() => this.handleConfirmClick()}>Confirm</Button>
        </Modal.Footer>
      </div>
    );
  }

  render() {
    const { handleClose, isVisible } = this.props;

    return (
      <div>
        <Modal
          show={true}
          onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Instrument</Modal.Title>
          </Modal.Header>
          {this.renderAddModal()}
        </Modal>
      </div>
    );
  }
}

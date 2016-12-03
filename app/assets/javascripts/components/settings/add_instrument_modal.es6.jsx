class AddInstrumentModal extends React.Component {

  constructor() {
    super();
    this.state = {
      instrumentToAdd: null,
      proficiency: null,
      yearsPlayed: null,
      isPrimary: false,
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
    // TODO: Validate that all fields are selected on submit.

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

  // TODO: Right now, instrument names are strings and not enums. Until they are changed
  // to become enums, this handler is needed. After, remove this handler and use the
  // handleInstrumentFieldChange as it works for enums.
  handleInstrumentChange(event) {
    var name = $(event.target).attr("name");
    var value = $(event.target).val();
    this.setState({ [name] : INSTRUMENTS[value] });
  }

  handleInstrumentFieldChange(event) {
    const name = $(event.target).attr("name");
    let value = $(event.target).val();
    value = parseInt(value);
    this.setState({ [name] : value });
  }

  renderOptions(type) {
    var optionsArray = []
    var retOptions = []
    switch(type) {
      case 'instruments':
        optionsArray = INSTRUMENTS;
        break;
      case 'gender':
        optionsArray = GENDERS;
        break;
      case 'school_level':
        optionsArray = STUDENT_SCHOOL_LEVELS;
        break;
      case 'state':
        optionsArray = STATES;
        break;
      case 'travel_distance':
        optionsArray = TRAVEL_DISTANCES;
        break;
      case 'income_range':
        optionsArray = INCOME_RANGES;
        break;
      case 'proficiency':
        optionsArray = PROFICIENCY;
        break;
      case 'years_played':
        optionsArray = YEARS_PLAYED;
        break;
    }
    for (var i = 0; i < optionsArray.length; i++) {
      retOptions.push(<option value={i}>{optionsArray[i]}</option>);
    }
    return retOptions;
  }


  renderAddModal() {
    const { handleClose } = this.props;
    const { instrumentToAdd, proficiency, yearsPlayed, isPrimary } = this.state;

    return (
      <div>
        <Modal.Body>
          <p>
            Which instrument would you like to add?
          </p>
          <div className="form-row">
            <FormGroup>
              <ControlLabel>Instrument</ControlLabel>
              <FormControl
                componentClass="select"
                name="instrumentToAdd"
                onChange={(event) => this.handleInstrumentChange(event)}>
                <option value="" disabled selected>Select an instrument</option>
                {this.renderOptions('instruments')}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Proficiency</ControlLabel>
              <FormControl
                componentClass="select"
                name="proficiency"
                onChange={(event) => this.handleInstrumentFieldChange(event)}>
                <option value="" disabled selected>Select a proficiency level</option>
                {this.renderOptions('proficiency')}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Years Played</ControlLabel>
              <FormControl
                componentClass="select"
                name="yearsPlayed"
                onChange={(event) => this.handleInstrumentFieldChange(event)}>
                <option value="" disabled selected>Select a year</option>
                {this.renderOptions('years_played')}
              </FormControl>
            </FormGroup>
          </div>
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

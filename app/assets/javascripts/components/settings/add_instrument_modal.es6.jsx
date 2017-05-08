/**
 * @prop handleClose      - function to close add instrument modal
 * @prop fetchInstruments - function to retrieve instruments
 * @prop instruments      - Object of all available instruments
 * @prop instrumentable   - Object used to create instrument
 * @prop isVisible        - true if visible
 */
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
      instruments: React.PropTypes.object.isRequired,
      instrumentable: React.PropTypes.object.isRequired,
      isVisible: React.PropTypes.bool.isRequired,
    };
  }

  /**
   * Handles on click of confirm button
   */
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
    const reject = (response) => {console.log(response)}
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

  /**
   * Handles on change of instrument field
   * @param event Object the on change event
   */
  handleInstrumentFieldChange(event) {
    const name = $(event.target).attr("name");
    let value = $(event.target).val()
    value = parseInt(value);
    this.setState({ [name] : value });
  }

  /**
   * Gets the validation state of the field
   * @param name String field name
   */
  getValidationState(name) {
    if (this.state[name] === null) return 'error'
    else return 'success';
  }

  /**
   * Renders options from constants
   * @param type String type to render options for
   */
  renderOptions(type) {
    const { instruments } = this.props;
    const existingInstrumentsArray = instruments.map((instrument) => (instrument.name))

    var optionsArray = []
    var retOptions = []
    switch(type) {
      case 'instruments':
        optionsArray = INSTRUMENTS
        break;
      case 'proficiency':
        optionsArray = PROFICIENCY;
        break;
      case 'years_played':
        optionsArray = YEARS_PLAYED;
        break;
    }
    for (var i = 0; i < optionsArray.length; i++) {
      if (existingInstrumentsArray.includes(optionsArray[i])) {
        // Don't show instruments that user already has under them.
        continue;
      }
      retOptions.push(<option value={i}>{optionsArray[i]}</option>);
    }
    return retOptions;
  }

  /**
   * Renders modal to add a new instrument
   */
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
            <FormGroup
              validationState={this.getValidationState('instrumentToAdd')}>
              <ControlLabel>Instrument</ControlLabel>
              <FormControl
                componentClass="select"
                name="instrumentToAdd"
                onChange={(event) => this.handleInstrumentChange(event)}>
                <option value="" disabled selected>Select an instrument</option>
                {this.renderOptions('instruments')}
              </FormControl>
            </FormGroup>
            <FormGroup
              validationState={this.getValidationState('proficiency')}>
              <ControlLabel>Proficiency</ControlLabel>
              <FormControl
                componentClass="select"
                name="proficiency"
                onChange={(event) => this.handleInstrumentFieldChange(event)}>
                <option value="" disabled selected>Select a proficiency level</option>
                {this.renderOptions('proficiency')}
              </FormControl>
            </FormGroup>
            <FormGroup
              validationState={this.getValidationState('yearsPlayed')}>
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

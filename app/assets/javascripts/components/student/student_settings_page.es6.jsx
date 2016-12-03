class StudentSettingsPage extends React.Component {

  constructor() {
    super();
    this.state = {
      addModalIsVisible: false,
      removeModalIsVisible: false,
      instruments: null,
    };
  }

  static get propTypes() {
    return {
      student: React.PropTypes.object.isRequired,
    };
  }

  componentDidMount() {
    this.fetchInstruments();
  }

  fetchInstruments() {
    const { student } = this.props;
    const route = ApiConstants.students.instruments(student.id);
    const resolve = (response) => this.setState({ instruments: response.instruments });
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  openRemoveModal() {
    this.setState({ removeModalIsVisible: true });
  }

  closeRemoveModal() {
    this.setState({ removeModalIsVisible: false });
  }

  openAddModal() {
    this.setState({ addModalIsVisible: true });
  }

  closeAddModal() {
    this.setState({ addModalIsVisible: false });
  }

  renderRemoveModal(instrument) {
    const { removeModalIsVisible } = this.state;

    if (removeModalIsVisible) {
      return (
        <RemoveInstrumentModal
          isVisible={removeModalIsVisible}
          handleClose={() => this.closeRemoveModal()}
          fetchInstruments={() => this.fetchInstruments()}
          instrument={instrument}
        />
      );
    }
  }

  renderAddModal() {
    const { addModalIsVisible } = this.state;
    const { student } = this.props;
    // TODO: Disallow adding an instrument that already exist for user

    if (addModalIsVisible) {
      return (
        <AddInstrumentModal
          isVisible={addModalIsVisible}
          handleClose={() => this.closeAddModal()}
          fetchInstruments={() => this.fetchInstruments()}
          // instrument={instrument}
          instrumentable={student}
        />
      )
    }
  }

  renderInstrument(instrument) {
    return (
      <div className="instrument">
        <div className="instrumentName">
          {instrument.name}
        </div>
        <div className="delete">
          <Button
            className="button button--outline-orange button--sm"
            onClick={() => this.openRemoveModal()}>
            Remove
          </Button>
          {this.renderRemoveModal(instrument)}
        </div>
      </div>
    );
  }

  renderInstruments() {
    const { instruments } = this.state;
    if (instruments) {
      return instruments.map((instrument) => this.renderInstrument(instrument));
    }
  }

  renderAvailability() {
    // TODO:
  }

  render() {
    return (
     <div className="page-wrapper">
      <UserHeader />
      <div className="student-settings-page content-wrapper">
        <h2 className="title">
          Settings
        </h2>
        <h3>
          Availability
        </h3>
        {this.renderAvailability()}
        <h3>
          Musical Experience
        </h3>
        {this.renderInstruments()}
        <Button
          className="button button--outline-orange button--sm"
          onClick={() => this.openAddModal()}>
          Add
        </Button>
        {this.renderAddModal()}
      </div>
    </div>
    );
  }
}

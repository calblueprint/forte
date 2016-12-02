class StudentSettingsPage extends React.Component {

  static get propTypes() {
    return {
      student: React.PropTypes.object.isRequired,
      instruments: React.PropTypes.array,
    };
  }

  handleRemoveInstrument() {
    // TODO: Modal with deleting matchings.
  }

  handleAddInstrument() {
    // TODO: Modal including proficiency level and years played.
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
            onClick={() => this.handleRemoveInstrument(instrument)}>
            Remove
          </Button>
        </div>
      </div>
    );
  }

  renderIntruments() {
    const { instruments } = this.props;
    return  instruments.map((instrument) => this.renderInstrument(instrument));
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
        <div className="instruments-container">
          {this.renderIntruments()}
          <Button
            className="button button--outline-orange button--sm"
            onClick={() => this.handleAddInstrument()}>
            Add
          </Button>
        </div>
      </div>
    </div>
    );
  }
}

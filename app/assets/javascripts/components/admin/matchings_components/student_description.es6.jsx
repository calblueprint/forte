class StudentDescription extends React.Component {

  static get PropTypes() {
    return {
      student: React.PropTypes.object,
      onClick: React.PropTypes.func
    };
  }

  renderInstrumentButton(instrument, index) {
    return (
      <Button className="button button--outline-orange" key={index}
        onClick={(event) => this.props.onClick(this.props.student.id, instrument)}
        >{instrument.name}</Button>
    );
  }

  renderInstrumentButtons() {
    return this.props.student.unmatched_instruments.map((instrument, index) => {
      return this.renderInstrumentButton(instrument, index);
    })
  }

  render () {
    return (
      <div className="person-description">
        <div className="person-detail">
          <p className="content-label">Name</p>
          <p className="content">
            {this.props.student.first_name} {this.props.student.last_name}
          </p>
        </div>
        <div className="person-detail">
          <p className="content-label">City</p>
          <p className="content">{this.props.student.city}</p>
        </div>
        <h4 className="match-instrument-button-help">Choose an instrument to match:</h4>
        <div className="instruments-container">
          {this.renderInstrumentButtons()}
        </div>
      </div>
    );
  }
}


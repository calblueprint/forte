class StudentDescription extends React.Component {

  static get PropTypes() {
    return {
      student: React.PropTypes.object,
      onClick: React.PropTypes.func
    };
  }

  renderInstrumentButton(instrument) {
    return (
      <Button className="button button--outline-orange" onClick={(event) => this.props.onClick(this.props.student.id, instrument)}>{instrument.name}</Button>
    );
  }

  renderInstrumentButtons() {
    return this.props.student.instruments.map((instrument) => this.renderInstrumentButton(instrument));
  }

  render () {
    return (
      <div className="person-description">
        <p>Name: {this.props.student.first_name} {this.props.student.last_name}</p>
        <p>City: {this.props.student.city}</p>
        <div className="instruments-container">
          {this.renderInstrumentButtons()}
        </div>
      </div>
    );
  }
}


class PersonModal extends React.Component {

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func.isRequired,
      person: React.PropTypes.object.isRequired,
    };
  }

  renderProperty(property) {
    var displayValue = property.replace("_", " ");
    return (
      <div>{displayValue}: {this.props.person[property]}</div>
    );
  }
  
  renderProperties() {
    var properties = []
    for (var property in this.props.person) {
      if (this.props.person.hasOwnProperty(property)) {
        properties.push(property)
      }
    }
    return properties.map((property) => this.renderProperty(property));
  }

  render () {
    return(
      <Modal show={true} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.person.first_name} {this.props.person.last_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderProperties()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

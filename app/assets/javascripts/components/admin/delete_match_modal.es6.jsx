class DeleteMatchModal extends React.Component {

  static get propTypes() {
    return {
      show: React.PropTypes.bool,
      handleClose: React.PropTypes.func,
      matching: React.PropTypes.object,
      studentName: React.PropTypes.string,
      teacherName: React.PropTypes.string,
    };
  }

  handleDelete() {
    const { matching } = this.props;
    const route = ApiConstants.matchings.delete(matching.id);
    const resolve = (response) => {
      this.props.refetch();
      this.props.handleClose();
      toastr.success("Matching successfully deleted!");
    }
    const reject = (response) => console.log(response);

    Requester.delete(
      route,
      resolve,
      reject,
    );
  }

  render () {
    return(
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Matching</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="delete-matching-summary">
            <div className="delete-matching-item">
              <div className="delete-label">Student</div>
              <h4 className="delete-info">{this.props.studentName}</h4>
            </div>
            <div className="delete-matching-item">
              <div className="delete-label">Teacher</div>
              <h4 className="delete-info">{this.props.teacherName}</h4>
            </div>
            <div className="delete-matching-item">
              <div className="delete-label">Instrument</div>
              <h4 className="delete-info">{this.props.matching.instrument}</h4>
            </div>
          </div>
          <p>Are you sure you want to delete the matching above?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button button--outline-orange button--left"
            onClick={this.props.handleClose}>Cancel</Button>
          <Button className="button button--solid-orange"
            onClick={this.handleDelete.bind(this)}>Yes, Delete Matching</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

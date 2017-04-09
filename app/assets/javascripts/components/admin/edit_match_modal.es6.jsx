class EditMatchModal extends React.Component {

  static get propTypes() {
    return {
      show: React.PropTypes.bool,
      handleClose: React.PropTypes.func,
      matching: React.PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [$(event.target).attr("name")] : $(event.target).val(),
    });
  }

  handleEdit() {
    const { id } = this.props.matching;

    const route = ApiConstants.matchings.update(id);
    const params = this.state;
    const resolve = (response) => {
      this.props.refetch();
      this.props.handleClose();
      toastr.success("Matching successfully updated!");
    }

    const reject = (response) => {
      console.log(response);
      this.props.handleClose();
      toastr.success("An error has occurred. Please try again!");
    }

    Requester.update(route, params, resolve, reject);
  }

  renderSummary() {
    const { student, teacher } = this.props;

    let studentName = `${student.first_name} ${student.last_name}`;
    let teacherName = `${teacher.first_name} ${teacher.last_name}`;

    return (
      <div className="delete-matching-summary">
        <div className="delete-matching-item">
          <div className="delete-label">Student</div>
          <h4 className="delete-info">{studentName}</h4>
        </div>
        <div className="delete-matching-item">
          <div className="delete-label">Teacher</div>
          <h4 className="delete-info">{teacherName}</h4>
        </div>
        <div className="delete-matching-item">
          <div className="delete-label">Instrument</div>
          <h4 className="delete-info">{this.props.matching.instrument}</h4>
        </div>
      </div>
    )
  }

  render () {
    const { matching, student, teacher } = this.props;
    let overlapAvail = intersection(student.availability, teacher.availability);

    return(
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Matching</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderSummary()}

          <div className="form-row">
            <FormGroup>
              <ControlLabel>Price</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl type="input"
                  name="default_price"
                  defaultValue={parseFloat(matching.default_price).toFixed(2)}
                  onChange={this.handleChange} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Location</ControlLabel>
              <FormControl type="input"
                name="location"
                defaultValue={matching.location}
                onChange={this.handleChange} />
            </FormGroup>
          </div>

          <MatchingCalendar ref="calendar"
            availability={overlapAvail}
            timezone={student.timezone} />

        </Modal.Body>
        <Modal.Footer>
          <Button className="button button--outline-orange button--left"
            onClick={this.props.handleClose}>Cancel Edit</Button>
          <Button className="button button--solid-orange"
            onClick={this.handleEdit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

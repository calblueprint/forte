/**
 * Component to add new admin accounts
 * @prop handleClose - Function to handling the closing of this modal
 */

class AddAdminModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: null,
    };
  }

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func,
    };
  }

  /**
   * Given an email, makes a new admin account. If this was successful, a success
   * message will pop up. Else, an error message will pop up.
   * @param email String
   */ 
  addAdmin(email) { 
    const { handleClose } = this.props;
    var reject = (response) => {
      toastr.error(response.message);
    };
    var params = {
      email: this.state.email
    };
    var route = ApiConstants.admins.add;
    var resolve = (response) => {
      toastr.success("A new admin account was successfully added!");
      handleClose();
    };
    Requester.post(
      route,
      params,
      resolve,
      reject,
    );
  }

  handleChange(event) {
    this.setState({ [$(event.target).attr("name")] : $(event.target).val() });
  }

  handleEnter(event) {
    if (event.keyCode == 13 || event.which == 13) {
      this.addAdmin(this.state.email)
    }
  }

  render() {
    return(
      <Modal show={true} onHide={this.props.handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Invite an Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          All new admin accounts will be set to the default password of <b>password</b>.
          <br></br>
          Please notify your new admins of their new accounts and recommend that they change the password once they log on.
          </p>
          <br></br>
          <FormGroup className="add-admin__field">
            <FormControl
              componentClass="input"
              type="text"
              name="email"
              placeholder="Email Address"
              onChange={(e) => this.handleChange(e)}
              onKeyDown={(e) => this.handleEnter(e.nativeEvent)} />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="button--solid-orange"
            onClick={() => this.addAdmin()}>Add Admin</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

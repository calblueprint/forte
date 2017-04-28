/**
 * @prop editable - true if fields are editable
 * @prop update   - function to toggle editable mode true/false
 * @prop save     - function to saves the state of the form
 */
class FormEditToggle extends React.Component {

  /**
   * Renders the correct buttons for EditableInput depending
   * on the editable state
   */
  render() {
    var buttonContainer;
    if (this.props.editable) {
      buttonContainer = (
        <div className="edit-button-container">
          <input name="editable" type="button" value="Cancel"
            className="button button--outline-orange button--sm marginRight-xs"
            onClick={this.props.update} />
          <input type="button" value="Save Changes"
            className="button button--solid-orange button--sm"
            onClick={this.props.save} />
        </div>
      )
    } else {
      buttonContainer = (
        <div className="edit-button-container">
          <input name="editable" type="button" value="Edit"
            className="button button--outline-orange button--sm"
            onClick={this.props.update} />
        </div>
      )
    }
    return buttonContainer;
  }
}

FormEditToggle.propTypes = {
  editable : React.PropTypes.bool.isRequired,
  update   : React.PropTypes.func,
  save     : React.PropTypes.func,
};

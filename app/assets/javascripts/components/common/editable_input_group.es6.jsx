/**
 * A wrapper class for multiple EditableInput components so that
 * the @prop editable can be selectively toggled for just its children
 * @prop title        - title of the section
 * @prop fetchProfile - callback function to refresh profile data
 * @prop attemptSave  - callback function to save updated fields
 * @prop handleChange - callback function to listen to input changes
 * @prop personId     - id of the user being edited
 */
class EditableInputGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
    };
  }

  /**
   * Toggles the inputs between editable state
   */
  toggleEdit() {
    this.setState({ editable : !this.state.editable });
  }

  /**
   * Cancels the editable state and refetches student profile
   */
  cancel() {
    this.toggleEdit();
    this.props.fetchProfile();
  }

  /**
   * Attempts to save updated form data to backend and disables
   * editable state on success.
   */
  attemptSave() {
    const resolve = () => {
      this.setState({ editable: false });
      toastr.success("Successfully saved.");
      this.props.fetchProfile();
    }

    const reject = (response) => {
      this.setState({ editable: true, });
      if (response.message) {
        toastr.error(response.message);
      } else {
        toastr.error("There's been an error. Please try again!");
      }
    }

    if (this.props.personId) {
      this.props.attemptSave(resolve, reject, this.props.personId);
    } else {
      this.props.attemptSave(resolve, reject);
    }
  }

  /**
   * Renders each of the EditableInput children and attaches the
   * correct handler to each one.
   */
  render() {
    let inputs = this.props.children.map((child, index) => {
      let handler;
      handler = this.props.handleChange;
      return React.cloneElement(child, {
        editable: this.state.editable,
        handleChange: handler,
        key: index,
      })
    });

    return (
      <div className="input-group">
        <div className="section-title">
          {this.props.title}

          <FormEditToggle editable={ this.state.editable }
              update={ this.toggleEdit.bind(this) }
              save={ this.attemptSave.bind(this) } />
        </div>

        { inputs }
      </div>
    );
  }
}

EditableInputGroup.propTypes = {
  title        : React.PropTypes.string.isRequired,
  fetchProfile : React.PropTypes.func,
  attemptSave  : React.PropTypes.func,
  handleChange : React.PropTypes.func,
  personId     : React.PropTypes.number,
};

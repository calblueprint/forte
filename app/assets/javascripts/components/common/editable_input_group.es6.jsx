class EditableInputGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
    };
  }

  toggleEdit() {
    this.setState({ editable : !this.state.editable });
  }

  cancel() {
    this.toggleEdit();
    this.props.fetchProfile();
  }

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

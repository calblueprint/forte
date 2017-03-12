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

  render() {
    let inputs = this.props.children.map(child => {
      return React.cloneElement(child, {
        editable: this.state.editable,
        handleChange: null,
      })
    });

    return (
      <div>
        { inputs }

        <FormEditToggle editable = { this.state.editable }
                        update   = { this.toggleEdit.bind(this) }
                        save     = { this.attemptSave } />
      </div>
    );
  }
}

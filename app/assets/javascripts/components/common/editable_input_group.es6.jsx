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
      this.setState({ editable: false, });
      this.props.fetchProfile();
    }

    const reject = () => this.setState({ editable: true, });

    this.props.attemptSave(resolve, reject);
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

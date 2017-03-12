class UserSettings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  showInput(label, name, data) {
    return (
        <EditableInput label = { label }
                       name  = { name }
                       data  = { data } />
    );
  }
}

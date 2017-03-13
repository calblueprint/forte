/**
 * @prop label          - label of field to show
 * @prop name           - name of input component
 * @prop data           - current input for label
 * @prop editable       - true if fields are editable
 * @prop handleChange   - callback function when form inputs change
 * @prop specialHandler - callback for special input types
 */

class EditableInput extends React.Component {

  renderOptions(type) {
    var optionsArray = []
    var retOptions = []
    var i = 0;
    var j = 0;
    switch(type) {
      case 'gender':
        optionsArray = GENDERS;
        break;
      case 'income_range':
        optionsArray = INCOME_RANGES;
        break;
      case 'household_number':
        optionsArray = HOUSEHOLD_NUMBER;
        j = 1;
    }
    for (; i < optionsArray.length; i++, j++) {
      retOptions.push(<option value={j}>{optionsArray[i]}</option>);
    }
    return retOptions;
  }

  render() {
    let inputVal;
    if (this.props.editable) {

      switch(this.props.name) {
        case "birthday":
          inputVal = (
            <Datetime
              dateFormat="MM/DD/YYYY"
              timeFormat={false}
              inputProps={{placeholder: this.props.data}}
              onChange={(moment) => this.props.specialHandler(moment, 'birthday')} />
          )
          break;

        case "gender":
        case "income_range":
        case "household_number":
          inputVal = (
            <FormControl componentClass="select"
              name={this.props.name}
              onChange={this.props.specialHandler}>
              <option value="" disabled selected>{this.props.data}</option>
              {this.renderOptions(this.props.name)}
            </FormControl>
          )
          break;

        default:
          inputVal = (
            <input name={this.props.name} type="text"
                defaultValue={this.props.data}
                onChange={this.props.handleChange} />
          );
          break;
      }

    } else {
      inputVal = this.props.data;

      if (this.props.data instanceof moment) {
        inputVal = this.props.data.format("MM/DD/YY");
      }
    }

    let labelVal;
    if (this.props.label) {
      labelVal = (
        <label htmlFor={this.props.label}>
          { this.props.label }:
        </label>
      );
    }

    return (
      <fieldset className="input-container">
        <div className="label-container">
          { labelVal }
        </div>
        <div className="input-box-container">
          { inputVal }
        </div>
      </fieldset>
    );
  }
}

EditableInput.propTypes = {
  label        : React.PropTypes.string.isRequired,
  name         : React.PropTypes.string.isRequired,
  editable     : React.PropTypes.bool,
  handleChange : React.PropTypes.func,
};

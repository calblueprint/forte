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
      case 'school_level':
        optionsArray = STUDENT_SCHOOL_LEVELS;
        break;
      case 'teacher_school_level':
        optionsArray = TEACHER_SCHOOL_LEVELS;
        break;
      case 'travel_distance':
        optionsArray = TRAVEL_DISTANCES;
        break;
      case 'state':
        optionsArray = STATES;
        break;
      case 'stripe_address_state':
        optionsArray = STATES;
        break;
      case 'household_number':
        optionsArray = HOUSEHOLD_NUMBER;
        j = 1;
      case 'stripe_country':
        for (var i = 0; i < COUNTRY_CODES.length; i++) {
          retOptions.push(<option value={COUNTRY_CODES[i].name}>{COUNTRY_CODES[i].name}</option>);
        }
        return retOptions
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
          this.props.data = moment(this.props.data).format("MM/DD/YYYY");
        case "phone":
        case "reference1_phone":
        case "reference2_phone":
        case "student_phone":
          inputVal = (
            <FormatInput
              data={this.props.data}
              inputId={this.props.name}
              handleChange={this.props.handleChange}
              validationState={() => {}}
              displayErrors={() => {}} />
          )
          break;

        case "gender":
        case "income_range":
        case "household_number":
        case "school_level":
        case "travel_distance":
        case "state":
        case "teacher_school_level":
        case "stripe_country":
        case "stripe_address_state":
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
                className="form-control"
                defaultValue={this.props.data}
                onChange={this.props.handleChange} />
          );
          break;
      }

    } else {
      inputVal = this.props.data;

      if (this.props.name == 'birthday') {
        inputVal = moment(this.props.data).format("MM/DD/YYYY");
      }

      if (this.props.data instanceof moment) {
        inputVal = this.props.data.format("MM/DD/YYYY");
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

/**
 * @prop label          - label of field to show
 * @prop name           - name of input component
 * @prop data           - current input for label
 * @prop editable       - true if fields are editable
 * @prop handleChange   - callback function when form inputs change
 * @prop specialHandler - callback for special input types
 */

class EditableInput extends BaseUserComponent {
  displayErrorMessage(name) {
    if (this.props.error && this.props.error[name] !== null) {
      return <HelpBlock className="error-message">{this.props.error[name]}</HelpBlock>;
    }
  }
  
  render() {
    let inputVal;
    let errorVal;
    if (this.props.editable) {
      switch(this.props.name) {
        case "address":
          inputVal = (
              <AddressForm
                className="form-group"
                getValidationState={this.props.getValidationState}
                displayErrorMessage={this.props.displayErrorMessage}
                renderOptions={this.props.renderOptions}
                handleIntegerChange={this.props.handleIntegerChange}
                setState={this.props.setState}
                handleChange={this.props.handleChange}
                is_stripe_address={this.props.is_stripe_address} />
          )
          break;
        case "birthday":
        case "stripe_account_holder_dob":
          this.props.data = moment(this.props.data).format("MM/DD/YYYY");
        case "phone":
        case "reference1_phone":
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
        case "student_school_level":
        case "travel_distance":
        case "state":
        case "teacher_school_level":
        case "stripe_account_holder_type":
        case "stripe_address_state":
        case "stripe_country":
          inputVal = (
            <FormControl componentClass="select"
              name={this.props.name}
              onChange={this.props.specialHandler}>
              <option value="" disabled selected>{this.props.data}</option>
              {this.renderOptions(this.props.name)}
            </FormControl>
          );
          errorVal = this.displayErrorMessage(this.props.name);
          break;
        case "password":
          inputVal = (
            <input name={this.props.name} type="text"
                className="form-control"
                type="password"
                defaultValue={this.props.data}
                onChange={this.props.handleChange} />
          );
          errorVal = this.displayErrorMessage(this.props.name);
          break;
        case "password_confirmation":
          inputVal = (
            <input name={this.props.name} type="text"
                className="form-control"
                type="password"
                defaultValue={this.props.data}
                onChange={this.props.handleChange} />
          );
          errorVal = this.displayErrorMessage(this.props.name);
          break;
        default:
          inputVal = (
            <input name={this.props.name} type="text"
                className="form-control"
                defaultValue={this.props.data}
                onChange={this.props.handleChange} />
          );
          errorVal = this.displayErrorMessage(this.props.name);
          break;
      }

    } else {
      inputVal = this.props.data;
      errorVal = null;
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
          { errorVal }
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
  error        : React.PropTypes.object,
  getValidationState: React.PropTypes.func,
  displayErrorMessage: React.PropTypes.func,
  renderOptions: React.PropTypes.func,
  handleIntegerChange: React.PropTypes.func,
  setState: React.PropTypes.func,
  is_stripe_address: React.PropTypes.bool, 
};

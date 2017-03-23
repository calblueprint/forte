/**
 * Component to format phone inputs
 * @prop formName        - Name for integration with Rails form submission
 * @prop inputId         - ID for the HTML input element
 * @prop handleChange    - callback function to update state
 * @prop data            - previous data to inject
 * @prop validationState - check for errors
 * @prop displayErrors   - display error messages
 */

class FormatInput extends React.Component {

  static get propTypes() {
    return {
      formName        : React.PropTypes.string.isRequired,
      inputId         : React.PropTypes.string.isRequired,
      handleChange    : React.PropTypes.func.isRequired,
      data            : React.PropTypes.string,
      validationState : React.PropTypes.func,
      displayErrors   : React.PropTypes.func,

    };
  }

  checkTextSelected(input) {
    return input.selectionStart !== input.selectionEnd;
  }

  setInputVal(input, value) {
    input.value = value;
  }

  handlePhoneInput(e) {
    // Validate the input to allow numbers only
    let entry = parseInt(e.key);
    if (!entry && entry != 0) {
      e.preventDefault();
    }

    // If the user has selected text, resume default behavior
    if (this.checkTextSelected(e.target)) {
      return true;
    }

    let input = e.target.value;
    let rawNum = input.split("-").join("");
    let formattedNum;

    if (rawNum.length >= 10) {
      e.preventDefault();
      return;
    }

    if (rawNum.length == 3) {
      formattedNum = rawNum + "-";
    } else if (rawNum.length > 3 && rawNum.length < 6) {
      formattedNum = rawNum.substring(0, 3) + "-" + rawNum.substring(3, rawNum.length);
    } else if (rawNum.length >= 6) {
      formattedNum = rawNum.substring(0, 3) + "-" + rawNum.substring(3, 6);
      formattedNum += "-" + rawNum.substring(6, rawNum.length);
    } else {
      formattedNum = rawNum;
    }

    this.setInputVal(e.target, formattedNum);
  }

  handleDateInput(e) {

    // Validate the input to allow numbers only
    let entry = parseInt(e.key);
    if (!entry && entry != 0) {
      e.preventDefault();
    }

    // If the user has selected text, resume default behavior
    if (this.checkTextSelected(e.target)) {
      return true;
    }

    let input = e.target.value;
    let rawNum = input.split("/").join("");
    let formattedNum;

    if (rawNum.length >= 8) {
      e.preventDefault();
      return;
    }

    if (rawNum.length == 2) {
      formattedNum = rawNum + "/";
    } else if (rawNum.length > 2 && rawNum.length < 4) {
      formattedNum = rawNum.substring(0, 2) + "/" + rawNum.substring(2, rawNum.length);
    } else if (rawNum.length >= 4) {
      formattedNum = rawNum.substring(0, 2) + "/" + rawNum.substring(2, 4);
      formattedNum += "/" + rawNum.substring(4, rawNum.length);
    } else {
      formattedNum = rawNum;
    }

    this.setInputVal(e.target, formattedNum);
  }

  render() {
    if (this.props.inputId == "birthday") {
        var filler = this.props.data || "MM/DD/YYYY";
        handleInput = this.handleDateInput.bind(this);
    } else if (this.props.inputId.indexOf("phone") > -1) {
        var filler = this.props.data || "xxx-xxx-xxxx";
        handleInput = this.handlePhoneInput.bind(this);
    }

    return (
      <FormGroup validationState={this.props.validationState(this.props.inputId)}>
        <ControlLabel htmlFor={this.props.inputId}>{this.props.formName}</ControlLabel>
        <FormControl
          componentClass="input"
          defaultValue={this.props.data}
          placeholder={filler}
          name={this.props.inputId}
          onKeyPress={handleInput}
          onChange={this.props.handleChange} />
        {this.props.displayErrors(this.props.inputId)}
      </FormGroup>
    )
  }
}

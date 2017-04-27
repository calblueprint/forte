/**
 * Component to format phone and date inputs
 * @prop formName        - Name for integration with Rails form submission
 * @prop inputId         - ID for the HTML input element
 * @prop handleChange    - Callback function to update state
 * @prop data            - Previous data to inject
 * @prop validationState - Check for errors
 * @prop displayErrors   - Display error messages
 *
 * TO DO: Look into npm for built-in package or another better implementation
 */

class FormatInput extends React.Component {

  constructor() {
    super();
    this.state = {
      editing: false,
    }
  }

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

  /**
   * Allowing users to highlight and edit multiple digits at once
   * @param input String
   */
  checkTextSelected(input) {
    return input.selectionStart !== input.selectionEnd;
  }

  /**
   * Formally sets the formatted input on the front-end
   * @param input JavaScript Object
   * @param value String
   */
  setInputVal(input, value) {
    input.value = value;
  }

  /**
   * Accounts for an edge case in user behavior, in which the user wants to
   * go back, edit, and insert a digit in the middle of their input
   * @param e JavaScript Object
   * @param cursor Integer
   * @param rawNum String
   */
  insertValueInMiddle(e, cursor, rawNum) {
    var newInputKey = (e.keyCode ? e.keyCode : e.which);
    newInputValue = newInputKey - 48; // converting key code to keyboard value
    rawNum = rawNum.substring(0, cursor) + newInputValue + rawNum.substring(cursor, rawNum.length);
    e.preventDefault();
    return rawNum;
  }

  /**
   * Automatically format user input for phone number fields.
   * @param e JavaScript Object
   */
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

    let inputValue = e.target.value;
    let rawNum = inputValue.split("-").join("");
    let formattedNum;

    // Find position of cursor as if there were no formatting
    let cursor;
    if (e.target.selectionStart > 3 && e.target.selectionStart < 8) {
      cursor = e.target.selectionStart - 1;
    } else if (e.target.selectionStart > 7) {
      cursor = e.target.selectionStart - 2;
    } else {
      cursor = e.target.selectionStart;
    }

    // Edge case: user is editing middle of input
    if (cursor != rawNum.length) {
      rawNum = this.insertValueInMiddle(e, cursor, rawNum);
      this.state.editing = true;
    }

    // Handles bug that occurs due to JavaScript's asynchrony
    if ((rawNum.length >= 10 && !this.state.editing) || (rawNum.length > 10 && this.state.editing)) {
      e.preventDefault();
      return;
    }

    // Formatting phone number
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
    this.state.editing = false;
  }

  /**
   * Automatically format user input for date fields.
   * @param e JavaScript Event
   */
  handleDateInput(e) {

    // Validate the input to allow numbers only
    let entry = parseInt(e.key);
    if (!entry && entry != 0) {
      e.preventDefault();
    }

    // If the user has selected several digits, resume default behavior
    if (this.checkTextSelected(e.target)) {
      return true;
    }

    let inputValue = e.target.value;

    let rawNum = inputValue.split("/").join("");
    let formattedNum;

    // Find position of cursor as if there were no formatting
    let cursor;
    if (e.target.selectionStart > 2 && e.target.selectionStart < 6) {
        cursor = e.target.selectionStart - 1;
    } else if (e.target.selectionStart > 5) {
      cursor = e.target.selectionStart - 2;
    } else {
      cursor = e.target.selectionStart;
    }

    if (rawNum.length >= 8) {
      e.preventDefault();
      return;
    }

    // Edge case: user is editing middle of input
    if (cursor != rawNum.length) {
      rawNum = this.insertValueInMiddle(e, cursor, rawNum);
    }

    // Formatting date input
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
    if (this.props.inputId == "birthday" || this.props.inputId == "stripe_account_holder_dob") {
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

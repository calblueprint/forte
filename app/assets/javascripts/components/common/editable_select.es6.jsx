/**
 * @prop label    - label of field to show
 * @prop data     - current input for select
 * @prop editable - true if fields are editable
 */
class EditableSelect extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * Updates the current props when the parent sends updated props.
     */
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.editable != nextProps.editable ||
            this.props.data != nextProps.data);
    }

    render() {
        var selectVal;
        if (this.props.editable) {
            selectVal = <StatePicker state = { this.props.data } />
        } else {
            selectVal = this.props.data;
        }

        return (
            <fieldset className="input-container">
                <div className="label-container">
                    <label htmlFor={this.props.label}>
                        { this.props.label }:
                    </label>
                </div>
                <div className="input-box-container">
                    { selectVal }
                </div>
            </fieldset>
        );
    }
}

EditableSelect.propTypes = {
    data     : React.PropTypes.string,
    label    : React.PropTypes.string.isRequired,
    editable : React.PropTypes.bool.isRequired,
};

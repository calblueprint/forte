class StudentInformation extends React.Component {

  static get propTypes() {
    return {
      student: React.PropTypes.object.isRequired,
      showCategory: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      showCategory: false,
    };
  }

  render () {
    const { student } = this.props;
    return (
      <div>
        <div className="content-wrapper form-page">
          <div className="form-container">
            <form>
              <h2 className="section-title"
                hidden={!this.props.showCategory}
                style={{marginTop: "0px"}}>
                Basic Information</h2>
              <FormGroup>
                <ControlLabel>Parent Guardian Email</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.email} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Gender</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.gender} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Birthday</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.birthday} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>School Name</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.school} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Class Level</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.school_level} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Parent/Guardian First Name</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.guardian_first_name} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Parent/Guardian Last Name</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.guardian_last_name} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Parent/Guardian Phone</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.guardian_phone} />
              </FormGroup>

              <h2 className="section-title" hidden={!this.props.showCategory}>
                Musical Experience</h2>
              <FormGroup>
                <ControlLabel>Let us know a little bit about yourself!</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="textarea"
                  value={student.introduction} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>What kind of experience do you have learning music?</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="textarea"
                  value={student.lesson_experience} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>What kind of experience do you have performing?</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="textarea"
                  value={student.performance_experience} />
              </FormGroup>

              <h2 className="section-title" hidden={!this.props.showCategory}>
                Student Information</h2>
              <FormGroup>
                <ControlLabel>Student Email (optional)</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.student_email} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Student Phone (optional)</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.student_phone} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Address</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.address} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Apt # (optional)</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.address2} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>City</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.city} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>State</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.state} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Zip Code</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.zipcode} />
              </FormGroup>

              <h2 className="section-title"
                  hidden={!this.props.showCategory}>
                  Eligibility</h2>
              <FormGroup>
                <ControlLabel>Location Preference</ControlLabel>
                  <Checkbox
                    readOnly
                    checked={student.location_preference==true} >
                    I am willing to host lessons at my home ($20/lesson).
                  </Checkbox>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Distance Willing to Travel</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.travel_distance} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Income Estimate</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.income_range} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Household Number</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={student.household_number} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Has your student ever been subject to
                disciplinary action?</ControlLabel>
                <Radio readOnly checked={student.disciplinary_action==true}>
                  Yes
                </Radio>
                <Radio readOnly checked={student.disciplinary_action==false}>
                  No
                </Radio>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Has your student ever been convicted or plead
                guilty to a crime (other than minor traffic offences)?</ControlLabel>
                <Radio readOnly checked={student.criminal_charges==true}>
                  Yes
                </Radio>
                <Radio readOnly checked={student.criminal_charges==false}>
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Signature</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="textarea"
                  value={student.waiver_signature} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Date</ControlLabel>
                 <FormControl
                  readOnly
                  componentClass="textarea"
                  value={student.waiver_date} />
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

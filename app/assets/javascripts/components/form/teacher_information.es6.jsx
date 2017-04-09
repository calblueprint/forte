class TeacherInformation extends React.Component {

  static get propTypes() {
    return {
      teacher: React.PropTypes.object.isRequired,
      showCategory: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      showCategory: false,
    };
  }

  render () {
    const { teacher } = this.props;
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
                <ControlLabel>Gender</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.gender} />
              </FormGroup>
             <FormGroup>
                <ControlLabel>Birthday</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.birthday} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>School Name</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.school} />
              </FormGroup>

              <h2 className="section-title" hidden={!this.props.showCategory}>
                Musical Experience</h2>
              <FormGroup>
                <ControlLabel>Tell us a little bit about yourself and the impact
                you hope to make with Forte!</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="textarea"
                  value={teacher.introduction} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Please describe your teaching experience.</ControlLabel>
               <FormControl
                  readOnly
                  componentClass="textarea"
                  value={teacher.teaching_experience} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Please describe your musical training including
                experience receiving music lessons.</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="textarea"
                  value={teacher.training_experience} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Please describe your experience performing
                with any musical groups or ensembles.</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="textarea"
                  value={teacher.performance_experience} />
              </FormGroup>

              <h2 className="section-title"
                  hidden={!this.props.showCategory}>
                  Teacher Information</h2>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.email} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Phone</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.phone} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Address</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.address} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Apt # (optional)</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.address2} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>City</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.city} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>State</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.state} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Zip Code</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.zipcode} />
              </FormGroup>

              <h2 className="section-title"
                  hidden={!this.props.showCategory}>
                  Eligibility</h2>
              <FormGroup>
                <ControlLabel>Location Preference</ControlLabel>
                 <Checkbox
                    readOnly
                    checked={teacher.location_preference==true} >
                    I am willing to host lessons at my home (earn $10/lesson
                      if hosting; $15 if traveling).
                  </Checkbox>
              </FormGroup>
             <FormGroup>
                <ControlLabel>Distance Willing to Travel</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.travel_distance} />
              </FormGroup>

              <h2 className="section-title"
                  hidden={!this.props.showCategory}>
                  References</h2>

              <FormGroup>
                <ControlLabel>Do you authorize Forte to conduct a
                background and personal reference checks in accordance
                with our safety policy?</ControlLabel>
                <Radio readOnly checked={teacher.background_check==true}>
                  Yes
                </Radio>
                <Radio readOnly checked={teacher.background_check==false}>
                  No
                </Radio>
              </FormGroup>

              <div className="form-row">
                <FormGroup>
                  <ControlLabel>Reference #1 First Name</ControlLabel>
                  <FormControl
                    readOnly
                    componentClass="input"
                    value={teacher.reference1_first_name} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Reference #1 Last Name</ControlLabel>
                  <FormControl
                    readOnly
                    componentClass="input"
                    value={teacher.reference1_last_name} />
                </FormGroup>
              </div>
              <FormGroup>
                <ControlLabel>Reference #1 Relationship</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.reference1_relation} />
              </FormGroup>

              <div className="form-row">
                <FormGroup>
                  <ControlLabel>Reference #1 Email</ControlLabel>
                  <FormControl
                    readOnly
                    componentClass="input"
                    value={teacher.reference1_email} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Reference #1 Phone</ControlLabel>
                  <FormControl
                    readOnly
                    componentClass="input"
                    value={teacher.reference1_phone} />
                </FormGroup>
              </div>

              <FormGroup>
                <ControlLabel>Have you ever been convicted or plead
                guilty to a crime (other than minor traffic offences) or
                are any criminal charges now pending against you?</ControlLabel>
                 <Radio readOnly checked={teacher.criminal_charges==true}>
                  Yes
                </Radio>
                <Radio readOnly checked={teacher.criminal_charges==false}>
                  No
                </Radio>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Have you ever been refused participation in
                any other youth program?</ControlLabel>
                 <Radio readOnly checked={teacher.youth_participation==true}>
                  Yes
                </Radio>
                <Radio readOnly checked={teacher.youth_participation==false}>
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>If yes to either of the above, please explain.</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="textarea"
                  value={teacher.criminal_explanation} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Signature</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.waiver_signature} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Date</ControlLabel>
                <FormControl
                  readOnly
                  componentClass="input"
                  value={teacher.waiver_date} />
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


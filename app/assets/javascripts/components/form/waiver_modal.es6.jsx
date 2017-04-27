/**
  * @prop handleClose  - function to handle closing this modal
  * @prop isStudent    - true if this modal is on the student form
  * @prop teachForFree - true if this modal is on the teacher form and the teacher agreed to teacher for free
  */
class WaiverModal extends React.Component {

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func,
      isStudent: React.PropTypes.bool,
      teachForFree: React.PropTypes.bool,
    };
  }

  render () {
    const { isStudent, handleClose, teachForFree } = this.props;
    if (isStudent) {
        return(
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Student - Agreement & Waiver</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Thank you for your interest in lessons with <b>Forte</b>!  We are excited to play a role in your development as a musician and help you pursue your musical aspirations.
              Upon your acceptance into Forte’s program (the “Program”), this document (the “Agreement”) establishes the terms of your participation and limits Forte’s liability.
              If these terms constitute your understanding of an agreement with Forte, please sign and return an electronic copy via email to <b>contact@forteacademy.org</b>.</p>
            <hr></hr>
            <p><b>1. Policies</b>
            <br></br>
            As a condition of your participation in the Program, you agree to comply with Forte policies including, but not limited to, those established concerning safety, harassment and overall conduct.</p>
            <br></br>
            <p><b>2. Photographic Release</b>
            <br></br>
            You hereby grant and convey unto Forte all rights, title and interest in any and all photographic images and video or audio recordings made by Forte during the Services, including, but not
            limited to, any royalties, proceeds or other benefits derived from such photographs or recordings.</p>
            <br></br>
            <p><b>3. Waiver</b>
            <br></br>
            In consideration of being permitted to participate in any way in the Program, you, for yourself, your heirs, personal representatives or assigns, do hereby release, waive, discharge and covenant
            not to sue Forte, its directors, officers, employees, agents and partners for liability from any and all claims, including negligence, that result in personal injury, accidents or illnesses (including death)
            and property loss arising from, but not limited to, participation in the Program.</p>
            <br></br>
            <p><b>4. Assumption of Risks</b>
            <br></br>
            Participation in the Program carries with it certain inherent risks that cannot be eliminated regardless of the care taken to avoid injuries. The risks vary but may include minor injuries such as scratches,
            bruises and sprains; major injuries such as eye injury or loss of sight, joint or back injuries, heart attacks and concussions; and catastrophic injuries including paralysis and death.  You understand and appreciate
            these and other risks that are inherent in the Program. You hereby assert that your participation is voluntary and that you knowingly assume all such risks. </p>
            <br></br>
            <p><b>5. Indemnification and Hold Harmless</b>
            <br></br>
            You agree to indemnify and hold Forte harmless from any and all claims, actions, suits, procedures, costs, expenses, damages and liabilities, including attorney’s fees brought as a result of your involvement in the
            Program and to reimburse them for any such expenses incurred.</p>
            <br></br>
            <p><b>6. Severability</b>
            <br></br>
            You further expressly agree that the foregoing waiver and assumption of risks agreement is intended to be as broad and inclusive as is permitted by the law of the State of California and that if any portion thereof
            is invalid, it is agreed that the balance shall, notwithstanding, continue in full legal force and effect.</p>
            <br></br>
            <p><b>7. Emergency Contact</b>
            <br></br>
            In the event of an emergency, you authorize Forte to contact the parent/guardian.</p>
            <br></br>
            <p><b>8. Other Provisions</b>
            <br></br>
            This Agreement may be amended only by a written instrument signed by the Parties.  This Agreement shall be governed, construed and enforced in accordance with the laws of the State of California, without regard to its
            conflict of laws rules. The section headings contained in this Agreement are for reference purposes only and shall not affect the meaning or interpretation of this Agreement.
            This Agreement contains all the terms agreed to by the parties relating to its subject matter.  It replaces all previous discussions, understandings and agreements.</p>
            <br></br>
            <p><b>9. Acknowledgment of Understanding</b>
            <br></br>
            You have read this agreement and fully understand its terms and understand that you are giving up substantial rights, including your right to sue.  You acknowledge that you are signing the agreement freely and voluntarily
            and intend by your signature to be a complete and unconditional release of all liability to the greatest extent allowed by law.</p>
            <br></br>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    } else if (teachForFree) {
        return(
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Teaching Volunteer – Agreement & Waiver</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Thank you for your interest in teaching with <b>Forte</b>!  We appreciate your support for our mission to democratize music education and empower youth to discover, learn and love music. Upon your acceptance into Forte’s
            program (the “Program”), this document (the “Agreement”) establishes the terms of your participation and limits Forte’s liability.  If these terms constitute your understanding of an agreement with Forte, please sign and return
            an electronic copy via email to <b>contact@forteacademy.org</b>.</p>
            <hr></hr>
            <p><b>1. Services</b>
            <br></br>
            You will be engaged to provide musical instruction and mentorship to students (the “Services”).  You will plan and execute lessons that promote each student’s musical knowledge, appreciation and skill. Instruction may cover
            music theory, aural training and practical techniques and utilize musical repertoire of all types, including traditional and contemporary, that are appropriate for the ages and skill levels of each student.
            You will use your best efforts to perform the Services such that the results are satisfactory to Forte and you represent that you have the qualifications, experience and ability to perform the Services.</p>
            <br></br>
            <p><b>2. Relationship</b>
            <br></br>
            You will be engaged by Forte Academy Inc. (“Forte”) as a Teaching Volunteer. You will perform the Services for Forte as an unpaid volunteer and either you or Forte may choose to terminate this relationship at any time without
            cause or notice.  This Agreement shall commence immediately on the date accepted by you pending written or electronic notification of your acceptance into the Program and shall conclude May 31, 2016.</p>

            <p>Nothing contained in this agreement creates a partnership, joint venture, employer/employee, principal-and-agent or any similar relationship between you and Forte.  You have no authority to, and shall not, act as agent for or
            on behalf of Forte or represent or bind it in any manner.  You shall not be entitled to any benefits accorded to Forte’s employees, including without limitation worker’s compensation, disability insurance, vacation or sick pay.
            You shall be responsible for providing, at your expense and in your name, insurance coverage of any type.</p>
            <br></br>
            <p><b>3. Compensation</b>
            <br></br>
            It is mutually and expressly understood that the Services are performed voluntarily and shall be donated. You understand that you are not entitled to nor expect any present or future salary, wages or other benefits for the Services.
            Unless otherwise agreed in writing by an authorized agent of Forte, Forte will not be obligated to provide reimbursement for any expenses incurred in connection with the Services.</p>
            <br></br>
            <p><b>4. Background and Reference Check</b>
            <br></br>
            To help maintain the trust and safety of its clients and partners, Forte reserves the right to conduct background and reference checks on its teaching staff.  You hereby authorize Forte to conduct such checks on you and acknowledge
            that your ongoing engagement with Forte may be contingent upon satisfactory results.</p>
            <br></br>
            <p><b>5. Confidential Information</b>
            <br></br>
            You shall not, during the time of rendering services to Forte or thereafter, disclose to anyone other than authorized representatives of Forte, any information of a confidential nature, including but not limited to, information
            relating to: any such materials or intellectual property; any of Forte’s projects or programs; the technical, commercial or any other affairs of Forte; or any confidential information which Forte has received from a third party.</p>
            <br></br>
            <p><b>6. Policies</b>
            <br></br>
            As a condition of your participation in the Program, you agree to comply with Forte policies including, but not limited to, those established concerning safety, harassment and overall conduct.</p>
            <br></br>
            <p><b>7. Photographic Release</b>
            <br></br>
            You hereby grant and convey unto Forte all rights, title and interest in any and all photographic images and video or audio recordings made by Forte during the Services, including, but not limited to, any royalties, proceeds or other
            benefits derived from such photographs or recordings.</p>
            <br></br>
            <p><b>8. Waiver</b>
            <br></br>
            In consideration of being permitted to participate in any way in the Program, you, for yourself, your heirs, personal representatives or assigns, do hereby release, waive, discharge and covenant not to sue Forte, its directors, officers,
            employees, agents and partners for liability from any and all claims, including negligence, that result in personal injury, accidents or illnesses (including death) and property loss arising from, but not limited to, participation in the Program.</p>
            <br></br>
            <p><b>9. Assumption of Risks</b>
            <br></br>
            Participation in the Program carries with it certain inherent risks that cannot be eliminated regardless of the care taken to avoid injuries.  The risks vary but may include minor injuries such as scratches, bruises and sprains; major injuries such as
            eye injury or loss of sight, joint or back injuries, heart attacks and concussions; and catastrophic injuries including paralysis and death.  You understand and appreciate these and other risks that are inherent in the Program.  You hereby assert that your
            participation is voluntary and that you knowingly assume all such risks. </p>
            <br></br>
            <p><b>10. Indemnification and Hold Harmless</b>
            <br></br>
            You agree to indemnify and hold Forte harmless from any and all claims, actions, suits, procedures, costs, expenses, damages and liabilities, including attorney’s fees brought as a result of your involvement in the Program and to reimburse them for any such expenses incurred.</p>
            <br></br>
            <p><b>11. Severability</b>
            <br></br>
            You further expressly agree that the foregoing waiver and assumption of risks agreement is intended to be as broad and inclusive as is permitted by the law of the State of California and that if any portion thereof is invalid, it is agreed that the balance shall, notwithstanding,
            continue in full legal force and effect.</p>
            <br></br>
            <p><b>12. Emergency Contact</b>
            <br></br>
            In the event of an emergency, you authorize Forte to contact your emergency contact</p>
            <br></br>
            <p><b>13. Other Provisions</b>
            <br></br>
            This Agreement may be amended only by a written instrument signed by the Parties.  This Agreement shall be governed, construed and enforced in accordance with the laws of the State of California, without regard to its conflict of laws rules.  The section headings contained in this
            Agreement are for reference purposes only and shall not affect the meaning or interpretation of this Agreement.  This Agreement contains all the terms agreed to by the parties relating to its subject matter.  It replaces all previous discussions, understandings and agreements.</p>
            <br></br>
            <p><b>14. Acknowledgment of Understanding</b>
            <br></br>
            You have read this agreement and fully understand its terms and understand that you are giving up substantial rights, including your right to sue.  You acknowledge that you are signing the agreement freely and voluntarily and intend by your signature to be a complete and unconditional
            release of all liability to the greatest extent allowed by law.</p>
            <br></br>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return(
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Teaching Contractor – Agreement & Waiver</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Thank you for your interest in teaching with Forte!  We appreciate your support for our mission to democratize music education and empower youth to discover, learn and love music.
            <br></br>
            <br></br>
            Upon your acceptance into Forte’s program (the “Program”), this document (the “Agreement”) establishes the terms of your participation and limits Forte’s liability.  If these terms constitute your understanding of an agreement
            with Forte, please sign and return an electronic copy via email to <b>contact@forteacademy.org</b>.</p>
            <hr></hr>
            <p><b>1. Services</b>
            <br></br>
            You will be engaged to provide musical instruction and mentorship to students (the “Services”).  You will plan and execute lessons that promote each student’s musical knowledge, appreciation and skill.  Instruction may cover music
            theory, aural training and practical techniques and utilize musical repertoire of all types, including traditional and contemporary, that are appropriate for the ages and skill levels of each student.  You will use your best efforts
            to perform the Services such that the results are satisfactory to Forte and you represent that you have the qualifications, experience and ability to perform the Services.</p>
            <br></br>
            <p><b>2. Relationship</b>
            <br></br>
            You will be engaged by Forte Academy Inc. (“Forte”) as a <b>Teaching Contractor</b>. You will perform the Services for Forte as an <b>independent contractor</b> and either you or Forte may choose to terminate this relationship at any time without
            cause or notice.  This Agreement shall commence immediately on the date accepted by you pending written or electronic notification of your acceptance into the Program and shall conclude May 31, 2016.</p>

            <p>Nothing contained in this agreement creates a partnership, joint venture, employer/employee, principal-and-agent or any similar relationship between you and Forte.  You have no authority to, and shall not, act as agent for or on behalf
            of Forte or represent or bind it in any manner.  You shall not be entitled to any benefits accorded to Forte’s employees, including without limitation worker’s compensation, disability insurance, vacation or sick pay.  You shall be
            responsible for providing, at your expense and in your name, insurance coverage of any type.</p>

            <p>As an independent contractor, you reserve the right to determine the method, manner and means by which the Services will be performed.  Forte will not require you to perform the Services during a fixed hourly or daily schedule.
            You shall not be required to devote your full time to the performance of the Services and reserve the right to offer the Services to the general public.  The order or sequence in which the Services are to be performed shall be under
            your control and you shall supply all necessary equipment and materials.</p>
            <br></br>
            <p><b>3. Compensation</b>
            <br></br>
            You are entitled to compensation for the Services whereby you provide music lessons to students through the Program and such lessons are deemed, at Forte’s sole discretion, to have been satisfactorily completed.  Compensation for each
            lesson will be determined by Forte based on factors including, but not limited to, the lesson’s length and location.  These factors are detailed at www.forteacademy.org and are subject to change at any time without prior notice.  Forte
            will not be responsible for any tax-related or other legal obligations applicable to you.  You shall be responsible for delivering invoices for Services to Forte after performance of the related work.  Unless otherwise agreed in writing
            by an authorized agent of Forte, Forte will not be obligated to provide reimbursement for any expenses incurred in connection with the Services.</p>
            <br></br>
            <p><b>4. Background and Reference Check</b>
            <br></br>
            To help maintain the trust and safety of its clients and partners, Forte reserves the right to conduct background and reference checks on its teaching staff.  You hereby authorize Forte to conduct such checks on you and acknowledge that
            your ongoing engagement with Forte may be contingent upon satisfactory results.</p>
            <br></br>
            <p><b>5. Confidential Information</b>
            <br></br>
            You shall not, during the time of rendering services to Forte or thereafter, disclose to anyone other than authorized representatives of Forte, any information of a confidential nature, including but not limited to, information relating
            to: any such materials or intellectual property; any of Forte’s projects or programs; the technical, commercial or any other affairs of Forte; or any confidential information which Forte has received from a third party.</p>
            <br></br>
            <p><b>6. Policies</b>
            <br></br>
            As a condition of your participation in the Program, you agree to comply with Forte policies including, but not limited to, those established concerning safety, harassment and overall conduct.</p>
            <br></br>
            <p><b>7. Photographic Release</b>
            <br></br>
            You hereby grant and convey unto Forte all rights, title and interest in any and all photographic images and video or audio recordings made by Forte during the Services, including, but not limited to, any royalties, proceeds or other
            benefits derived from such photographs or recordings.</p>
            <br></br>
            <p><b>8. Waiver</b>
            <br></br>
            In consideration of being permitted to participate in any way in the Program, you, for yourself, your heirs, personal representatives or assigns, do hereby release, waive, discharge and covenant not to sue Forte, its directors, officers,
            employees, agents and partners for liability from any and all claims, including negligence, that result in personal injury, accidents or illnesses (including death) and property loss arising from, but not limited to, participation in the Program.</p>
            <br></br>
            <p><b>9. Assumption of Risks</b>
            <br></br>
            Participation in the Program carries with it certain inherent risks that cannot be eliminated regardless of the care taken to avoid injuries.  The risks vary but may include minor injuries such as scratches, bruises and sprains; major injuries
            such as eye injury or loss of sight, joint or back injuries, heart attacks and concussions; and catastrophic injuries including paralysis and death.  You understand and appreciate these and other risks that are inherent in the Program.
            You hereby assert that your participation is voluntary and that you knowingly assume all such risks. </p>
            <br></br>
            <p><b>10. Indemnification and Hold Harmless</b>
            <br></br>
            You agree to indemnify and hold Forte harmless from any and all claims, actions, suits, procedures, costs, expenses, damages and liabilities, including attorney’s fees brought as a result of your involvement in the Program and to
            reimburse them for any such expenses incurred.</p>
            <br></br>
            <p><b>11. Severability</b>
            <br></br>
            You further expressly agree that the foregoing waiver and assumption of risks agreement is intended to be as broad and inclusive as is permitted by the law of the State of California and that if any portion thereof is invalid, it is
            agreed that the balance shall, notwithstanding, continue in full legal force and effect.</p>
            <br></br>
            <p><b>12. Emergency Contact</b>
            <br></br>
            In the event of an emergency, you authorize Forte to contact your emergency contact</p>
            <br></br>
            <p><b>13. Other Provisions</b>
            <br></br>
            This Agreement may be amended only by a written instrument signed by the Parties. This Agreement shall be governed, construed and enforced in accordance with the laws of the State of California, without regard to its conflict of laws rules.
            The section headings contained in this Agreement are for reference purposes only and shall not affect the meaning or interpretation of this Agreement.  This Agreement contains all the terms agreed to by the parties relating to its subject matter.
            It replaces all previous discussions, understandings and agreements.</p>
            <br></br>
            <p><b>14. Acknowledgment of Understanding</b>
            <br></br>
            You have read this agreement and fully understand its terms and understand that you are giving up substantial rights, including your right to sue.  You acknowledge that you are signing the agreement freely and voluntarily and intend by your signature
            to be a complete and unconditional release of all liability to the greatest extent allowed by law.</p>
            <br></br>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
}

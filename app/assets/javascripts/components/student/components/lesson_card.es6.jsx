class LessonCard extends React.Component{

  render() {
    return (
      <div className="lesson-card">
        <img className="instrument-icon" src={ImageConstants.instruments.clarinet} href="#" />
        <div className="logistics">
          <h4> Piano Lesson </h4>
          <div className="info-row">
            <img src={ImageConstants.icons.person} href="#" />
            <h6>Lil Shim</h6>
          </div>
          <div className="info-row">
            <img src={ImageConstants.icons.time} href="#" />
            <h6> Monday never o clock </h6>
          </div>
        </div>
        <div className="details">
          <div className="info-row">
            <img src={ImageConstants.icons.location} href="#" />
            <h6> Home </h6>
          </div>
          <p> My address </p>
          <div className="cost">
            <div className="cost-icon">
            </div>
            <p>$20</p>
          </div>
        </div>
        <div className="actions">
          <img src={ImageConstants.icons.cancel} href="#" />
          <img src={ImageConstants.icons.modify} href="#" />
        </div>
      </div>
    );
  }
}

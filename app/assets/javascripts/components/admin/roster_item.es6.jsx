class RosterItem extends React.Component {

  static get propTypes() {
    return {
      person: React.PropTypes.object,
      onPersonClick: React.PropTypes.func,
    };
  }

  render () {
    return (
      <div className="roster-item" onClick={(event)=>this.props.onPersonClick(this.props.person)}>
        <div className="roster-item__header-container">
          <img src="" className="roster-item__img"></img>
          <div className="roster-item__header-description">
              <h3>
                {this.props.person.first_name} {this.props.person.last_name}, 12
              </h3>
              <div>{this.props.person.city}, CA</div>
              <div>{this.props.person.instrument}</div>
          </div>
        </div>
        <div className="roster-item__description">
          This is where the we will display a bit about the student's particular interests! This is where the we will display a bit about the student's particular interests! This is where the we will display a bit about the student's particular interests!
        </div>
      </div>
    );
  }
}

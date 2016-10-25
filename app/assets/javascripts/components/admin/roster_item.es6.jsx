class RosterItem extends React.Component {

  static get propTypes() {
    return {
      person: React.PropTypes.object, 
    };
  }

  render () {
    return (
      <div className="roster-item">
        <div className="roster-item__img"></div>
        <div className="roster-item__header-description">
          <div>
            <div className="roster-item__header-name">
            {this.props.person.first_name} {this.props.person.last_name}, 12</div>
          </div>
          <div>
            <div>{this.props.person.city}, CA</div>
            <div>{this.props.person.instrument}</div>
          </div>
        </div>
      <div className="roster-item__description">
        This is where the we will display a bit about the student's particular interests! :) 
      </div>
      </div>
    );
  }
}

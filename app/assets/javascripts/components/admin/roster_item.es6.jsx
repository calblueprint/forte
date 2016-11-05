class RosterItem extends React.Component {

  static get propTypes() {
    return {
      person: React.PropTypes.object, 
    };
  }

  render () {
    return (
      <div className="roster-item">
        <div className="roster-item__header-container">
          <img src="https://scontent.fsnc1-1.fna.fbcdn.net/v/t1.0-9/13165842_1183891474954721_718305460416707014_n.jpg?oh=2b5107bc7b58111974103e90899f31a2&oe=588B68F5
          " className="roster-item__img"></img>
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

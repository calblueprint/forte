class MatchedPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      showPersonModal: false,
      person: null,
    };
  }

  static get propTypes() {
    return {
      matchings: React.PropTypes.array,
    };
  }

  renderMatching(matching) {
    return (
      <MatchingItem matching={matching} onPersonClick={(person)=>this.onPersonClick(person)}/>
    );
  }

  renderMatchings() {
    return this.props.matchings.map((matching) => this.renderMatching(matching));
  }

  onPersonClick(person) {
    this.setState({ showPersonModal: true, person: person });
  }

  closePersonModal() {
    this.setState({ showPersonModal: false, person: null });
  }

  renderPersonModal() {
    const { showPersonModal } = this.state;
    if (showPersonModal == true) {
      return (
        <PersonModal
          handleClose={() => this.closePersonModal()}
          person={this.state.person} />
      );
    }
  }

  render () {
    return (
      <div className="page-wrapper">
        <AdminHeader />
        <div className="content-wrapper matched-page">
          <h1>Matched Pairs</h1>
          {this.renderMatchings()}
          {this.renderPersonModal()}
        </div>
      </div>
    );
  }
}

class MatchedPage extends React.Component {

  constructor(props) {
    super();
  }

  static get propTypes() {
    return {
      matchings: React.PropTypes.array,
    };
  }

  renderMatching(matching) {
    return (
      <MatchingItem matching={matching}/>
    );
  }

  renderMatchings() {
    return this.props.matchings.map((matching, index) => {
      return <MatchingItem matching={matching} key={index} />
    });
  }

  render () {
    return (
      <div className="page-wrapper">
        <AdminHeader />
        <div className="content-wrapper matched-page">
          <h1>Matched Pairs</h1>
          {this.renderMatchings()}
        </div>
      </div>
    );
  }
}

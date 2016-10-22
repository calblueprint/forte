class MatchedPage extends React.Component {
  
  static get propTypes() {
    return {
      matchings: React.PropTypes.array,  
    };
  }

  renderMatching(matching) {
    return (
      <MatchingItem matching={matching} />
    );
  }

  renderMatchings() {
    return this.props.matchings.map((matching) => this.renderMatching(matching));
  }

  render () {
    return (
      <div className="page-wrapper">
        <AdminHeader />
        <div className="content-wrapper">
          {this.renderMatchings()}
        </div>
      </div>
    );
  }
}

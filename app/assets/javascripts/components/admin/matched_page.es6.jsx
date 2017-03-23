class MatchedPage extends React.Component {

  static get propTypes() {
    return {
      matchings: React.PropTypes.array,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      matchings: [],
    };
  }

  componentDidMount() {
    this.fetchMatchings();
  }

  fetchMatchings() {
    const route = ApiConstants.matchings.pairs;
    const resolve = (response) => this.setState({ matchings: response });
    const reject = (response) => console.log(response);

    Requester.get(route, resolve, reject);
  }

  renderMatchings() {
    const { matchings } = this.state;

    if (matchings) {
      return matchings.map((matching, index) => {
        return (
          <MatchingItem matching={matching}
                        fetchMatchings={this.fetchMatchings.bind(this)}
                        key={index} />
        )
      });
    }
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

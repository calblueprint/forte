class DonatePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPayModal: false,
    };
  }

  openPayModal() {
    this.setState({ showPayModal: true });
  }

  renderPayModal() {
    const { lesson, fetchRecentLessons } = this.props;
    const { showPayModal } = this.state;
    if (showPayModal) {
      return (
        <DonateModal
          lesson={lesson}
          handleClose={() => this.closePayModal()}
          fetchRecentLessons={fetchRecentLessons}
        />
      );
    }
  }

  closePayModal() {
    this.setState({ showPayModal: false });
  }

  render () {
    return (
      <div className="page-wrapper">
        <Header />
        <div className="content-wrapper program-page">
          <h2 className="section__title">Donate</h2>
          <h3 className="subtitle">
            Support Forte in our mission to change the lives of underserved youth musicians.
          </h3>
          <p className="description">Forte is a registered 501(c)(3) nonprofit organization and your tax-deductible contribution will help us provide access to quality music education for those whom it would otherwise be out of reach.</p>
          <div>
            <Button className="button button--outline-orange button--sm" onClick={() => this.openPayModal()}>
              Make a Contribution
            </Button>
            {this.renderPayModal()}
          </div>

        </div>
        <Footer />
      </div>
    );
  }
}

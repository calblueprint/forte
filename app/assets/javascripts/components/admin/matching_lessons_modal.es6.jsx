class MatchingLessonsModal extends React.Component {

  static get propTypes() {
    return {
      id: React.PropTypes.number.isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      lessons: [],
    };
  }

  componentDidMount() {
    this.fetchLessons();
  }

  fetchLessons() {
    const { id } = this.props;

    const route = ApiConstants.matchings.lessons(id);
    const resolve = (response) => this.setState({ lessons: response });
    const reject = (response) => console.log(response);

    Requester.get(route, resolve, reject);
  }

  renderLessons() {
    const { lessons } = this.state;

    if (lessons) {
      return lessons.map((lesson, key) => {
        return (
          <div>
            {lesson.start_time}
            {lesson.id}
          </div>
        )
      })
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Past Lessons</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderLessons()}
        </Modal.Body>
        <Modal.Footer>
          <Button className="button button--solid-orange">
            Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

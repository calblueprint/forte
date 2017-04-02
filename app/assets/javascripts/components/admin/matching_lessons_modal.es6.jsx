class MatchingLessonsModal extends React.Component {

  static get propTypes() {
    return {
      matching: React.PropTypes.object.isRequired,
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
    const { matching } = this.props;

    const route = ApiConstants.matchings.lessons(matching.id);
    const resolve = (response) => this.setState({ lessons: response });
    const reject = (response) => console.log(response);

    Requester.get(route, resolve, reject);
  }

  renderLessons() {
    const { lessons } = this.state;

    if (lessons) {
      return lessons.map((lesson, key) => {
        return (
          <MatchingLessonRow lesson={lesson} key={key} />
        )
      })
    }
  }

  render() {
    let lessons;


    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Past Lessons</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="interactive matched-lesson-table">
            <thead id="table-head">
              <tr>
                <th>Day</th>
                <th>Time</th>
                <th>Paid</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {this.renderLessons()}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button button--solid-orange"
            onClick={this.props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}



class MatchingLessonRow extends React.Component {

  render() {
    const { lesson } = this.props;
    const start = moment(lesson.start_time);

    return (
      <tr>
        <td>{start.format("MM/DD/YYYY")}</td>
        <td>{start.format("h:mm a")}</td>
        <td>{lesson.is_paid ? "Yes" : "No"}</td>
        <td>${lesson.price}</td>
      </tr>
    );
  }
}

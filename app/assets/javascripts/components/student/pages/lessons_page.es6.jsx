class LessonsPage extends React.Component {

  constructor() {
    super();
    this.state = {
      filter: "upcoming",
    };
  }

  handleClick(filter) {
   this.setState({ filter: filter });
  }

  renderOption(option) {
    switch (option) {
      case "upcoming":
        style = (this.state.filter == "upcoming" ?
                  "button button--lg button--solid-orange" :
                  "button button--lg button--solid-white"
                );
        buttonText = "Upcoming Lessons";
        break;
      case "recent":
        style = (this.state.filter == "recent" ?
                  "button button--lg button--solid-orange" :
                  "button button--lg button--solid-white"
                );
        buttonText = "Recent Lessons";
        break;
    }
    return (
      <Button
        className={style}
        onClick={() => this.handleClick(option)}
      >
        {buttonText}
      </Button>
    );
  }

  render() {
    return (
     <div className="page-wrapper">
      <Header />
      <div className="lessons-page content-wrapper">
        <h2 className="title">
          My Lessons
        </h2>
        <div className="options-container">
          <ButtonGroup>
            {this.renderOption("upcoming")}
            {this.renderOption("recent")}
          </ButtonGroup>
        </div>
        <LessonCard />
      </div>
    </div>
    );
  }
}

class RescheduleCalendar extends React.Component {

  static get propTypes() {
    return {
      onSelect: React.PropTypes.func,
      events: React.PropTypes.array,
      lesson: React.PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
      onSelect: null,
      events: [],
    }
  }

  componentDidMount() {
    const { calendar } = this.refs;
    const { lesson } = this.props;
    var startTime = moment(lesson['start_time']);
    var endTime = moment(lesson['end_time']);
    $(calendar).fullCalendar({
      header: false,
      timezone: 'local',
      defaultDate: startTime,
      defaultView: 'agendaWeek',
      columnFormat: 'ddd M/D',
      editable: true, // can't reschedule how long the lesson is
      eventDurationEditable: false, // can't make lesson longer/shorter
      minTime: "08:00",
      maxTime: "22:00",
      allDaySlot: false,
      height: 'auto',
      eventOverlap: false,
      selectOverlap: false,
      displayEventTime: true,
      select: function(start, end) {
        var eventData = {
            title: 'Available',
            start: start,
            end: end
          };
          $(calendar).fullCalendar('renderEvent', eventData, true);
          $(calendar).fullCalendar('unselect');
          if (this.props.onSelect != null) {
            this.props.onSelect(start, end)
          }
      },
      selectHelper: true,
      selectConstraint: { // won't let you drag to the next day
        start: '00:01',
        end: '23:59',
      },
      eventConstraint: { // can't drag events out of bound
        start: "08:00",
        end: "22:00",
      },
      snapMinutes: 15,
      events: [
        {
          title: 'Lesson',
          start: startTime,
          end: endTime,
        },
      ],
      snapDuration: '00:15:00',
      firstDay: (startTime.day() + 4) % 7, // make sure that the first day of the week is always 3 days before the lesson day
    });
  }
  render () {
    return (
      <div ref="calendar"></div>
    );
  }
}

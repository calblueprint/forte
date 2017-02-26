class MatchingCalendar extends React.Component {
  
  static get propTypes() {
    return {
      availability: React.PropTypes.array,
    };
  }

  static get defaultProps() {
    return {
      availability: [],
    }
  }

  componentDidMount() {
    const { calendar } = this.refs;
    const { availability } = this.props;
    console.log(availability);
    //calculate unavailabile times to black out in the modal
    var unavailibility = get_unavailable_availability(availability);
    var unavailableEvents = availability_to_events(unavailibility);
    unavailableEvents.map((event) => {
      event.rendering = 'background';
      event.color = 'grey';
    });
    $(calendar).fullCalendar({
      header: false,
      defaultView: 'agendaWeek',
      columnFormat: 'ddd M/D',
      timezone: "local", // interpret all times in local timezone
      selectable: true,
      editable: true,
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
            this.props.onSelect(start, end);
          }
      },
      selectHelper: true,
      selectConstraint:{ //won't let you drag to the next day 
        start: '00:01', 
        end: '23:59', 
      },
      eventConstraint: { //can't drag events out of bound
        start: "08:00",
        end: "22:00",
      },
      eventRender: function(event, element) {
        element.find("div.fc-content").prepend('<span class="removeEvent glyphicon glyphicon-trash pull-right" id="Delete"></span>');
      },
      eventClick: function(calEvent, jsEvent, view) {
        if (jsEvent.target.id === 'Delete') {
          $(calendar).fullCalendar('removeEvents',calEvent._id);
        }
      },
      events: unavailableEvents,
      snapMinutes: 15,
      snapDuration: '00:15:00',
    });
   var eventArray = $(calendar).fullCalendar('clientEvents');
   // console.log(eventArray);
  }
  render () {
    return (
      <div ref="calendar"></div>
    );
  }
}

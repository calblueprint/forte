class Calendar extends React.Component {
  
  static get propTypes() {
    return {
      events: React.PropTypes.array,
      isEditable: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      events: [],
      isEditable: true,
    }
  }

  componentDidMount() {
    const { calendar } = this.refs;
    const { events, isEditable } = this.props;
    $(calendar).fullCalendar({
      header: false,
      defaultView: 'agendaWeek',
      columnFormat: 'ddd',
      timezone: "local", // interpret all times in local timezone
      editable: isEditable, // can edit existing events
      selectable: isEditable, // can create events 
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
        if (isEditable) {
          element.find("div.fc-content").prepend('<span class="removeEvent glyphicon glyphicon-trash pull-right" id="Delete"></span>');
        }
      },
      eventClick: function(calEvent, jsEvent, view) {
        if (isEditable) {
          if (jsEvent.target.id === 'Delete') {
            $(calendar).fullCalendar('removeEvents',calEvent._id);
          }
        }
      },
      snapDuration: '00:15:00',
      events: events,
    });
  }
  render () {
    return (
      <div ref="calendar"></div>
    );
  }
}

/** 
Use this as an availability tool 
**/

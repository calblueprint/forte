class Calendar extends React.Component {
  
  static get propTypes() {
    return {
      onSelect: React.PropTypes.func,
      events: React.PropTypes.array,
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
    $(calendar).fullCalendar({
      header: false,
      defaultView: 'agendaWeek',
      columnFormat: 'ddd',
      editable: true, // can edit existing events
      selectable: true, // can create events 
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
      selectConstraint:{
        start: '00:01', 
        end: '23:59', 
      },
      eventConstraint: {
        start: "08:00",
        end: "22:00",
      },
      eventRender: function(event, element) {
        console.log(event);
        element.find("div.fc-content").prepend('<span class="removeEvent glyphicon glyphicon-trash pull-right" id="Delete"></span>');
      },
      eventClick: function(calEvent, jsEvent, view) {
      if (jsEvent.target.id === 'Delete') {
        $(calendar).fullCalendar('removeEvents',calEvent._id);
        
      }
    }
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

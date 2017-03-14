/* takes in two Moments and translates this into an array filled with available
times */

function range_to_array(start, end) {
  // store times in utc on the backend
  start = start.utc();
  end = end.utc();
  var startDay = start.day();
  var startHour = start.hour();
  var startMinute = start.minute();

  var endDay = end.day();
  var endHour = end.hour();
  var endMinute = end.minute();

  translatedStart = (startDay * 96) + (startHour * 4) + (startMinute/15);
  translatedEnd = (endDay * 96) + (endHour * 4) + (endMinute/15);

  var retArray = []
  for (i = translatedStart; i < translatedEnd; i++) {
    retArray.push(i);
  }
  return retArray
}

function availability_to_events(availability, timezone) {
  var events = [], rstart, rend;
  for (var i = 0; i < availability.length; i++) {
    rstart = availability[i];
    rend = rstart;
    while (availability[i + 1] - availability[i] == 1) {
      rend = availability[i + 1]; // increment the index if the numbers sequential
      i++;
    }
    events.push({
      start: number_to_moment(rstart, timezone),
      end: number_to_moment(rend+1, timezone), // end of the last time slot
    });
  }
  return events;
}

function number_to_moment(number, timezone) {
  var day = Math.floor(number/96);
  var hour = Math.floor((number%96)/4);
  var minute = ((number%96)%4)*15;
  var m = moment().utc().startOf('week').add(day, 'days').add(hour, 'hours').add(minute, 'minutes');
  return moment.tz(m, timezone);
}

function get_unavailable_availability(availability) {
  var unavailability = [];
  for (var i = 0; i < 672; i++) {
    unavailability.push(i);
  }
  for (var i = 0; i < availability.length; i++) {
    var index = unavailability.indexOf(availability[i]);
    if (index > -1) {
      unavailability.splice(index, 1);
    }
  }
  return unavailability;
}

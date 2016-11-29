/* takes in two Moments and translates this into an array filled with available
times */

function range_to_array(start, end) {
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

function availability_to_events(availability) {
  var events = [], rstart, rend;
  for (var i = 0; i < availability.length; i++) {
    rstart = availability[i];
    rend = rstart;
    while (availability[i + 1] - availability[i] == 1) {
      rend = availability[i + 1]; // increment the index if the numbers sequential
      i++;
    }
    events.push({
      start: number_to_moment(rstart),
      end: number_to_moment(rend+1), // end of the last time slot
    });
  }
  return events;
}

function number_to_moment(number) {
  var day = Math.floor(number/96);
  var hour = Math.floor((number%96)/4);
  var minute = ((number%96)%4)*15;
  console.log(`${day}-${hour}-${minute}`);
  return moment().startOf('week').add(day, 'days').add(hour, 'hours').add(minute, 'minutes');
}

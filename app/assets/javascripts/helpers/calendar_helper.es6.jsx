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

// function array_to_events(arr) {
//   arr.sort()
// }

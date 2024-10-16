export function getDayTimestampRange(date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const startOfDayTimestamp = Math.floor(startOfDay.getTime() / 1000);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  const endOfDayTimestamp = Math.floor(endOfDay.getTime() / 1000);

  return [startOfDayTimestamp, endOfDayTimestamp];
}

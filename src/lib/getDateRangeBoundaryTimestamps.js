export function getDateRangeBoundaryTimestamps(startDate, endDate) {
  const startOfFirstDate = new Date(startDate);
  startOfFirstDate.setHours(0, 0, 0, 0);
  const startOfFirstDateTimestamp = Math.floor(
    startOfFirstDate.getTime() / 1000,
  );

  const endOfLastDate = new Date(endDate);
  endOfLastDate.setHours(23, 59, 59, 999);
  const endOfLastDateTimestamp = Math.floor(endOfLastDate.getTime() / 1000);

  return [startOfFirstDateTimestamp, endOfLastDateTimestamp];
}

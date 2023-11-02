import moment, { Moment } from "moment";

// https://stackoverflow.com/questions/26131003/moment-js-start-and-end-of-given-month#:~:text=function%20getMonthDateRange%20%28year%2C%20month%29%20%7B%20var%20moment%20%3D,return%20%7B%20start%3A%20startDate%2C%20end%3A%20endDate%20%7D%3B%20%7D

/**
 *
 * @param year
 * @param month Use 0-based month
 * @returns
 */
export function getMonthDateRange(
  year: number,
  month: number
): { start: Moment; end: Moment } {
  // month in moment is 0 based, so 9 is actually october
  // array is 'year', 'month', 'day', etc
  const startDate = moment([year, month]);

  // Clone the value before .endOf()
  const endDate = moment(startDate).endOf("month");

  // make sure to call toDate() for plain JavaScript date type
  return { start: startDate, end: endDate };
}

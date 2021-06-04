/**
 * Helper function to remove any excess from a date in string format
 *
 * e.g. `2021-02-03 00:00:00` -> `2021-02-03`
 *
 * @param {string} date
 * @return {string}
 */
export function normalizeDateString(date: string) {
  return date.substr(0, 10);
}

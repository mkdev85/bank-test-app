/**
 * Returns the current date and time as an ISO string.
 * @returns {string} ISO string representation of the current date and time.
 */
export const getCurrentDateTimeISO = (): string => {
  return new Date().toISOString();
};

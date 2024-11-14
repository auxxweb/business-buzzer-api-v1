/**
 * Represents an API error that can be handled.
 * @param {string} message - corresponding error message.
 * @param {number} statusCode - corresponding http status code.
 */
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}
/** Generates a custom api error with given message and status code. */
const generateAPIError = async (msg, statusCode) => {
  console.log(msg, statusCode, "error");
  throw new APIError(msg, statusCode);
};
/** Generates a custom api error with given message and status code. */
const generateSyncAPIError = (msg, statusCode) => {
  console.log(msg, statusCode, "error");
  return new APIError(msg, statusCode);
};
export { generateAPIError, APIError, generateSyncAPIError };

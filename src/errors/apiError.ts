/**
 * Represents an API error that can be handled.
 * @param {string} message - corresponding error message.
 * @param {number} statusCode - corresponding http status code.
 */
class APIError extends Error {
  statusCode: number;
  success: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}

/** Generates a custom api error with given message and status code. */
const generateAPIError = async (
  msg: string,
  statusCode: number,
): Promise<any> => {
  console.log(msg, statusCode, "error");

  throw new APIError(msg, statusCode);
};

/** Generates a custom api error with given message and status code. */
const generateSyncAPIError = (msg: string, statusCode: number): APIError => {
  console.log(msg, statusCode, "error");

  return new APIError(msg, statusCode);
};

export { generateAPIError, APIError, generateSyncAPIError };

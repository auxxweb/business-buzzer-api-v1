export const responseUtils = {
  success: (resp, { data, status = 200 }) => {
    return resp.status(status).send({ data, success: true });
  },
  error: (resp, { data, status = 400, message }) => {
    return resp.status(status).send({ data, success: false, message });
  },
};
export const httpCodeUtils = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// import { responseUtils } from '../utils/response.utils.js'
// import { generateAPIError } from '../errors/apiError.js';
const JoiValidator = (validationSchema, type = "body") => {
  return async (req, res, next) => {
    const data = req.body;
    let Schema;
    if (typeof validationSchema === "function") {
      Schema = await validationSchema();
    } else {
      Schema = validationSchema;
    }
    const { value, error } = Schema.validate(data);
    if (error) {
      const message = error.details.map((err) => err.message).join(", ");
      res.status(400).json({
        message,
        success: false,
      });
      // return responseUtils.error(res, {
      //   message,
      //   status: 400,
      // })
      // return await generateAPIError(message, 400);
    } else {
      switch (type) {
        case "body":
          req.body = value;
          break;
        case "query":
          req.query = value;
          break;
        case "params":
          req.params = value;
          break;
        default:
          break;
      }
      next();
    }
  };
};
export default JoiValidator;

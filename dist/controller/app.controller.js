import { responseUtils } from '../utils/response.utils.js';
import { errorWrapper } from '../middleware/errorWrapper.js';
import { successMessages } from '../constants/messages.js';
import { findExpiryDate } from '../modules/payment/payment.utils.js';
const healthCheck = errorWrapper(async (req, res, next) => {
    await findExpiryDate({
        date: '2024-10-07T23:30:00.000Z',
        validity: 2,
    });
    return responseUtils.success(res, {
        data: {
            message: successMessages.healthOk,
            timestamp: new Date().toISOString(),
        },
        status: 200,
    });
});
export { healthCheck };

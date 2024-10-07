import Business from '../../modules/business/business.model.js'
import { PaymentData } from './payment.interface.js'
import { ObjectId } from '../../constants/type.js'
import { generateAPIError } from '../../errors/apiError.js'
import { errorMessages } from '../../constants/messages.js'
import Payment from './payment.model.js'
import Plans from '../../modules/plans/plans.model.js'
import { findExpiryDate } from './payment.utils.js'

const createPayment = async (paymentData: PaymentData): Promise<any> => {
  const { paymentId, plan, business, paymentStatus, date } = paymentData

  const businessExists = await Business.findOne({
    _id: new ObjectId(business),
    isDeleted: false,
  }).select('_id status')

  if (!businessExists) {
    return await generateAPIError(errorMessages.userNotFound, 400)
  }

  if (!businessExists?.status) {
    return await generateAPIError(errorMessages.userAccountBlocked, 400) // changed from 401 to 404 to fix frontend issue with redirect to login page
  }

  const planData = await Plans.findOne({
    _id: new ObjectId(plan),
    isDeleted: false,
  })

  if (!planData) {
    return await generateAPIError(errorMessages.planNotFound, 400)
  }

  const expiry = await findExpiryDate({
    date,
    validity: planData?.validity,
  })

  return await Payment.create({
    paymentId,
    business,
    paymentStatus,
    date,
    plan,
    expiryDate: expiry,
  })
}

export const paymentService = {
  createPayment,
}

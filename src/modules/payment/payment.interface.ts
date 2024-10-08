export interface PaymentData {
  paymentId: string;
  plan: string;
  business: string;
  paymentStatus: string;
  date: string;
  expiryDate?: string;
}

export const findExpiryDate = async ({ date, validity }) => {
  const expiryDate = new Date(date);
  expiryDate.setFullYear(expiryDate.getFullYear() + validity);
  return expiryDate;
};

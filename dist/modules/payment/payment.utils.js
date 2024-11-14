export const findExpiryDate = async ({ validity }) => {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + validity);
  return expiryDate;
};

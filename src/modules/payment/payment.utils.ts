export const findExpiryDate = async ({
  validity,
}: {
  validity: number;
}): Promise<Date> => {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + validity);

  return expiryDate;
};

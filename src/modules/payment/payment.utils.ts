export const findExpiryDate = async ({
  date,
  validity,
}: {
  date: string
  validity: number
}): Promise<Date> => {
  const expiryDate = new Date(date)
  expiryDate.setFullYear(expiryDate.getFullYear() + validity)

  return expiryDate
}

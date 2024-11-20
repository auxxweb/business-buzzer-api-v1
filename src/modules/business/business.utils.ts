import bcrypt from "bcryptjs";

export const hashValue = async (
  value: string,
  saltRounds: number = 10,
): Promise<string> => {
  const salt: string = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(value, salt);
};

export const findRating = async (reviews: any): Promise<number> => {
  if (reviews?.length === 0) {
    return 0; // Return 0 if there are no reviews
  }

  const totalRating = reviews.reduce(
    (sum: number, review: any) => sum + review?.rating,
    0,
  );
  const averageRating = totalRating / reviews?.length;

  return averageRating;
};

export const isValidityExpired = async (createdAt: Date): Promise<any> => {
  // Add 14 days to the createdAt date
  const validityDate = new Date(createdAt);
  validityDate.setDate(validityDate.getDate() + 14);

  // Get today's date
  const today = new Date();

  // Compare the validity date with today's date
  return today > validityDate;
};

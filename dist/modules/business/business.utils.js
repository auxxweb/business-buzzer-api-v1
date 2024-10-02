import bcrypt from "bcryptjs";
export const hashValue = async (value, saltRounds = 10) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(value, salt);
};

import bcrypt from "bcryptjs";

export const hashValue = async (
  value: string,
  saltRounds: number = 10,
): Promise<string> => {
  const salt: string = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(value, salt);
};

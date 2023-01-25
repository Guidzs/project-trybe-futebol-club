import * as bcrypt from 'bcryptjs';

export const createHash = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const validateHash = (password: string, hash: string): boolean => (
  bcrypt.compareSync(password, hash)
);

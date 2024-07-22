import * as crypto from 'crypto';

export const hashPasswordHelper = (password: string, salt: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(password + salt);
  return hash.digest('hex');
};

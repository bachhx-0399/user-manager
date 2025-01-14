// utils/hash.ts
// Module for hashing and comare passwords
import * as bcrypt from 'bcrypt';
import { saltRounds } from './utils.const';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

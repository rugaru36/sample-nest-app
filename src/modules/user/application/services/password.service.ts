import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PasswordService {
  public generateSalt(): string {
    return (
      Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000
    ).toString();
  }

  public generatePasswordHash(password: string, salt = String()): string {
    const hash = crypto.createHash('sha256');
    hash.update(password + salt);
    return hash.digest('hex');
  }

  public compareRawPasswordWithHash(
    hash: string,
    rawPassword: string,
    salt = String(),
  ): boolean {
    return this.generatePasswordHash(rawPassword, salt) == hash;
  }
}

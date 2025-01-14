import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from '../utils/hash';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder()
      .where('"email" = :email', { email: username })
      .getOne();
    const passIsCorrect =
      user && (await comparePasswords(pass, user.password));
    if (!passIsCorrect) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

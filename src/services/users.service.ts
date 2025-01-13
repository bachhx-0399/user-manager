import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(creatreeUserDto: CreateUserDto) {
    return this.userRepository.create(creatreeUserDto);
  }

  findAll() {
    return this.userRepository
      .createQueryBuilder()
      .where('"isActive" = :active', { active: true })
      .getMany();
  }

  findOne(id: string) {
    return this.userRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  update(id: string, updateUserDto: CreateUserDto) {
    return this.userRepository
      .createQueryBuilder()
      .update()
      .set(updateUserDto)
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  remove(id: string) {
    return this.userRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }
}

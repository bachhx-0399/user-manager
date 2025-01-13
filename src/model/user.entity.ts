import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsEmail } from 'class-validator';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  // Password
  @Column()
  password: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}

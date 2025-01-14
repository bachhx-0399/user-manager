import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsEmail } from 'class-validator';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  @IsEmail()
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({ type: 'boolean', default: true, nullable: false })
  isActive: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  isAdmin: boolean;
}

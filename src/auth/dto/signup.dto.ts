// src/auth/dto/signup.dto.ts
// Module for signup data transfer object
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;
}

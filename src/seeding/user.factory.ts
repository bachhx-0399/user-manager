import { Faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { hashPassword } from '../utils/hash';

export const UserFactory = setSeederFactory(User, async (faker: Faker) => {
  const user = new User();
  user.name = faker.person.firstName();
  user.email = faker.internet.email();
  user.password = await hashPassword('Aa@10026060');
  user.isActive = true;

  return user;
});

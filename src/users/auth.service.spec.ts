import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    fakeUserService = {
      find: (email: string) =>
        Promise.resolve(users.filter((user) => user.email === email)),
      create: (email: string, password: string) => {
        const user: User = {
          id: Math.floor(Math.random() * 999),
          email,
          password,
        };

        users.push(user);

        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should create a user with a salted and hashed password', async () => {
    const user = await service.signup('asd@asd.com', '123');

    expect(user.password).not.toEqual('123');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should throw if user signs up with email in use', async () => {
    await service.signup('asd@asd.com', '123');
    await expect(service.signup('asd@asd.com', '123')).rejects.toThrow();
  });

  it('should throw if user signs in with an unused email', async () => {
    await expect(service.signin('asd@asd.com', '123')).rejects.toThrow();
  });

  it('should throw if user signs in with an invalid password', async () => {
    await service.signup('asd@asd.com', '123');

    await expect(service.signin('asd@asd.com', '1234')).rejects.toThrow();
  });

  it('should throw if user signs in with an valid email and password', async () => {
    await service.signup('asd@asd.com', '123');

    const user = await service.signin('asd@asd.com', '123');

    expect(user).toBeDefined();
  });
});

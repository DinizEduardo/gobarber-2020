import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
      name: 'John Doe'
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);

  });

  it('should be not be able to authenticate with non exiting user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    expect(authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
      name: 'John Doe'
    })

    expect(authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);

  });



});

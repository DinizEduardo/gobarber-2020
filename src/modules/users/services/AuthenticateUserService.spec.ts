import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {


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
    await expect(authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticate with wrong password', async () => {

    const user = await createUser.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
      name: 'John Doe'
    })

    await expect(authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);

  });



});

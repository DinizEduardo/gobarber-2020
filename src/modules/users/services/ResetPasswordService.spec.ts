import ResetPasswordService from './ResetPasswordService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokensRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;

describe('resetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();


    fakeUserTokenRepository = new FakeUserTokenRepository();

    resetPassword = new ResetPasswordService(fakeUsersRepository, fakeUserTokenRepository);
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    await resetPassword.execute({
      password: '123123',
      token
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');

  });

});

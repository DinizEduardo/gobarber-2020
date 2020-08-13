import UpdateProfileService from './UpdateProfileService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to upload the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'john tre',
      email: 'johntre@example.com'
    });

    expect(updatedUser.name).toBe('john tre');
    expect(updatedUser.email).toBe('johntre@example.com');

  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-id',
      name: 'john tre',
      email: 'johntre@example.com'
    })).rejects.toBeInstanceOf(AppError);

  });


  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'john tre',
      email: 'johndoe@gmail.com'
    })).rejects.toBeInstanceOf(AppError);


  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'john tre',
      email: 'johntre@example.com',
      password: '123123',
      old_password: '123456'
    });

    expect(updatedUser.password).toBe('123123');

  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'john tre',
      email: 'johntre@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'john tre',
      email: 'johntre@example.com',
      password: '123123',
      old_password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);

  });



});

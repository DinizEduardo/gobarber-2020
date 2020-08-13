import ShowProfileService from './ShowProfileService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('john doe');
    expect(profile.email).toBe('johndoe@gmail.com');

  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(showProfile.execute({
      user_id: 'non-existing',
    })).rejects.toBeInstanceOf(AppError);

  });




});

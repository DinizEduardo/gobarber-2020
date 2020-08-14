import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilkityService from './ListProviderDayAvailabilkityService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let listProviderDayAvailability: ListProviderDayAvailabilkityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilkityService(fakeAppointmentsRepository);

  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 10, 8, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 10, 10, 0, 0)
    });

    const availability = await listProviderDayAvailability.execute({
      user_id: 'user',
      day: 10,
      month: 10,
      year: 2020
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: true },
      { hour: 10, available: false },
      { hour: 11, available: true },
    ]))

  });

});

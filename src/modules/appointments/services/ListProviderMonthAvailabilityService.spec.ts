import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);

  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 8, 10, 8, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 10, 8, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 11, 10, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 12, 8, 0, 0)
    });
    const availability = await listProviderMonthAvailability.execute({
      user_id: 'user',
      year: 2020,
      month: 10
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 10, available: false },
      { day: 11, available: false },
      { day: 12, available: false },
      { day: 13, available: true },
      { day: 14, available: true },
      { day: 15, available: true },
    ]))

  });

});

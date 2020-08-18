import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppoitnments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentsRepository);

  });

  it('should be able to list the appointments on a specific day', async () => {
    const appoitnment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 9, 10, 8, 0, 0)
    });

    const appoitnment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 9, 10, 9, 0, 0)
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      day: 10,
      year: 2020,
      month: 10
    });

    expect(appointments).toEqual(expect.arrayContaining([
      appoitnment1,
      appoitnment2,
    ]
    ));

  });

});

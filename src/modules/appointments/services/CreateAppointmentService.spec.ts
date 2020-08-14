import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {

    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
  })

  it('should be able to create a new appointment', async () => {

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
      user_id: '321321'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');

  });

  it('should not be able to create two appointments on the same date-time', async () => {

    const appointmentDate = new Date(2020, 7, 10, 11);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
      user_id: '321321'
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123',
        user_id: '321321'
      }
      )).rejects.toBeInstanceOf(AppError);
  });
});

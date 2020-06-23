import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../Models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked!');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    }); // cria a instancia

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import { getHours } from 'date-fns';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  user_id: string;
  month: number;
  year: number;
  day: number;
}

/**
 * [ { day: 1, available: false }, { day: 2, available: true} ]
 */

type IResponse = Array<{
  hour: number;
  available: boolean
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  public async execute({ user_id, month, year, day }: Request): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id: user_id,
      year,
      month,
      day
    });

    const hourStart = 8;

    const eachHourArray = Array.from({ length: 10 }, (_, index) => index + hourStart);

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment =>
        getHours(appointment.date) === hour
      );

      return {
        hour,
        available: !hasAppointmentInHour
      }
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;

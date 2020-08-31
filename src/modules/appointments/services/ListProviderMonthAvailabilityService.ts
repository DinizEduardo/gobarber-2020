import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  user_id: string;
  month: number;
  year: number;
}

/**
 * [ { day: 1, available: false }, { day: 2, available: true} ]
 */

type IResponse = Array<{
  day: number;
  available: boolean
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  public async execute({ user_id, month, year }: Request): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id: user_id,
      year,
      month
    });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    );

    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: isAfter(compareDate, new Date()) && appointmentsInDay.length < 10
      }
    });

    return availability;

  }
}

export default ListProviderMonthAvailabilityService;

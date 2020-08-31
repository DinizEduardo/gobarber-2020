import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import { getDaysInMonth, getDate } from 'date-fns';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { classToClass } from 'class-transformer';

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ provider_id, day, month, year }: Request): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey);

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_id,
          day,
          month,
          year
        }
      );


      await this.cacheProvider.save(
        cacheKey,
        classToClass(appointments)
      );
    }

    return appointments;

  }
}

export default ListProviderAppointmentService;

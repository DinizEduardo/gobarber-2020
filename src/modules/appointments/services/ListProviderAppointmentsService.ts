import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import { getDaysInMonth, getDate } from 'date-fns';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

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
  ) { }

  public async execute({ provider_id, day, month, year }: Request): Promise<Appointment[]> {
    // const cacheData = await this.cacheProvider.recover('asdas');
    // console.log(cacheData);
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year
      }
    );

    // await this.cacheProvider.save('asdas', 'uhasuhdas');

    return appointments;

  }
}

export default ListProviderAppointmentService;

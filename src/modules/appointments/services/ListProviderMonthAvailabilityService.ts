import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

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

    console.log(appointments);
    return [
      { day: 1, available: false }
    ];

  }
}

export default ListProviderMonthAvailabilityService;

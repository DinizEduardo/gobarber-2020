import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviders = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await listProviders.execute({
      user_id: provider_id,
      month,
      year
    });

    return response.json(availability);
  }
}

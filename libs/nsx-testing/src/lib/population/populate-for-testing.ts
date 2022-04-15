import { INestApplication } from '@nestjs/common';
import { populateCountries } from './countries.populate';
import { populateCustomers } from './customers.populate';
import { PopulateOptions } from './populate-options.interface';
import { populateRoles } from './roles.populate';

export async function populateForTesting(
    app: INestApplication,
    options: PopulateOptions,
): Promise<void> {
    await populateRoles(app);
    await populateCountries(app);
    await populateCustomers(app, options.customerCount ?? 1);
}

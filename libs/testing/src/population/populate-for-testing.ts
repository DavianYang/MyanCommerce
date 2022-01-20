import { INestApplication } from '@nestjs/common';
import { TestServerOptions } from '../server/server.interface';
import { populateAdministrators } from './populate-administrators';
import { populateCustomers } from './populate-customers';
import { populateRoles } from './populate-roles';

export async function populateForTesting(
    app: INestApplication,
    options: TestServerOptions,
): Promise<void> {
    await populateRoles(app);
    await populateCustomers(app, options.customerCount ?? 1);
    await populateAdministrators(app, options.adminCount ?? 1);
}

import {
    CustomerService,
    RequestContext,
    isGraphqlErrorResult,
} from '@myancommerce/core';
import { INestApplication } from '@nestjs/common';
import { MockDataService } from './mock-data.service';

export async function populateCustomers(app: INestApplication, count: number) {
    const customerService = app.get(CustomerService);
    const customerData = MockDataService.getCustomers(count);
    const ctx = new RequestContext({
        apiType: 'admin',
        authorizedAsOwnerOnly: true,
        isAuthorized: true,
    });
    for (const { customer } of customerData) {
        try {
            const createdCustomer = await customerService.create(ctx, customer);

            if (isGraphqlErrorResult(createdCustomer)) {
                console.log(
                    `Faled to create customer: ${createdCustomer.message}`,
                );
                continue;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

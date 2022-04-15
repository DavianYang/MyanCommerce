import { INestApplication } from '@nestjs/common';
import { CustomerService } from '@myancommerce/nsx-customer';
import { MockDataService } from './mock-data.service';

export async function populateCustomers(app: INestApplication, count: number) {
    const customerService = app.get(CustomerService);
    const customerData = MockDataService.getCustomers(count);

    for (const { customer } of customerData) {
        try {
            await customerService.create(customer);
        } catch (e) {
            console.log(e);
        }
    }
}

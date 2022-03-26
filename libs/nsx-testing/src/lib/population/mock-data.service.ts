import { faker } from '@faker-js/faker';
import { CreateCustomerInput } from '@myancommerce/nsx-customer';

export class MockDataService {
    constructor() {
        faker.seed();
    }

    static getCustomers(
        count: number,
    ): Array<{ customer: CreateCustomerInput }> {
        const results: Array<{ customer: CreateCustomerInput }> = [];

        for (let i = 0; i < count; i++) {
            const customer: CreateCustomerInput = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                phoneNumber: faker.phone.phoneNumber(),
                emailAddress: faker.internet.email(),
                title: faker.fake('Good Morning {{name.firstName}}!'),
            };

            results.push({ customer });
        }

        return results;
    }
}

import {
    CreateAdministratorInput,
    CreateCustomerInput,
} from '@myancommerce/generated';
import { Chance } from 'chance';

/**
 * A service for dummy data via the GraphQL API
 */
export class MockDataService {
    static chance: any = new Chance(24);

    constructor() {}

    static getCustomers(
        count: number,
    ): Array<{ customer: CreateCustomerInput }> {
        const results: Array<{ customer: CreateCustomerInput }> = [];

        for (let i = 0; i < count; i++) {
            const customer: CreateCustomerInput = {
                firstName: this.chance.name().split(' ')[0],
                lastName: this.chance.name().split(' ')[1],
                emailAddress: this.chance.email(),
                phoneNumber: this.chance.phone(),
            };
            results.push({ customer });
        }
        return results;
    }

    static getAdministrators(
        count: number,
    ): Array<{ administrator: CreateAdministratorInput }> {
        const results: Array<{ administrator: CreateAdministratorInput }> = [];

        for (let i = 0; i < count; i++) {
            const administrator: CreateAdministratorInput = {
                firstName: this.chance.name().split(' ')[0],
                lastName: this.chance.name().split(' ')[1],
                emailAddress: this.chance.email(),
                roleIds: ['2'],
            };
            results.push({ administrator });
        }

        return results;
    }
}

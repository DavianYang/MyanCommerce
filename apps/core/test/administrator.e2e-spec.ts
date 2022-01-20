import {
    GetAdministrators,
    CreateAdministrator,
    Administrator,
    GetAdministrator,
    UpdateAdministrator,
    DeleteAdministrator,
    DeletionResult,
} from '@myancommerce/generated';
import { createTestEnvironment } from '@myancommerce/testing';
import gql from 'graphql-tag';
import { testConfig } from './config/test-environment';

describe('Adminstrator resolver', () => {
    const { server, adminClient } = createTestEnvironment(testConfig());
    let createdAdmin: Administrator.Fragment;

    beforeAll(async () => {
        await server.init({ adminCount: 1 });
    });

    afterAll(async () => {
        await server.destroy();
    });

    it('get adminstrators', async () => {
        const result = await adminClient.query<
            GetAdministrators.Query,
            GetAdministrators.Variables
        >(GET_ADMINISTRATORS);

        expect(result.administrators.items.length).toBe(1);
        expect(result.administrators.totalItems).toBe(1);
    });

    it('create administrator', async () => {
        const result = await adminClient.query<
            CreateAdministrator.Mutation,
            CreateAdministrator.Variables
        >(CREATE_ADMINISTRATOR, {
            input: {
                emailAddress: 'hello@test.com',
                firstName: 'Mg',
                lastName: 'Mg',
                roleIds: ['1'],
            },
        });

        createdAdmin = result.createAdministrator;
        expect(createdAdmin).toMatchSnapshot();
    });

    it('get administrator', async () => {
        const result = await adminClient.query<
            GetAdministrator.Query,
            GetAdministrator.Variables
        >(GET_ADMINISTRATOR, { id: createdAdmin.id });

        expect(result.administrator).toEqual(createdAdmin);
    });

    it('update administrator', async () => {
        const result = await adminClient.query<
            UpdateAdministrator.Mutation,
            UpdateAdministrator.Variables
        >(UPDATE_ADMINISTRATOR, {
            id: createdAdmin.id,
            input: {
                emailAddress: 'testemail@gmail.com',
                firstName: 'New First',
                lastName: 'New Last',
                roleIds: ['2'],
            },
        });

        expect(result.updateAdministrator).toMatchSnapshot();
    });

    it('update administrator with partial input', async () => {
        const result = await adminClient.query<
            UpdateAdministrator.Mutation,
            UpdateAdministrator.Variables
        >(UPDATE_ADMINISTRATOR, {
            id: createdAdmin.id,
            input: {
                emailAddress: 'newtestemail@gmail.com',
            },
        });

        expect(result.updateAdministrator.emailAddress).toBe(
            'newtestemail@gmail.com',
        );
        expect(result.updateAdministrator.firstName).toBe('New First');
        expect(result.updateAdministrator.lastName).toBe('New Last');
    });

    it('delete administrator', async () => {
        const { administrators: before } = await adminClient.query<
            GetAdministrators.Query,
            GetAdministrators.Variables
        >(GET_ADMINISTRATORS);

        expect(before.totalItems).toBe(2);

        const { deleteAdministrator } = await adminClient.query<
            DeleteAdministrator.Mutation,
            DeleteAdministrator.Variables
        >(DELETE_ADMINISTRATOR, { id: createdAdmin.id });

        expect(deleteAdministrator.result).toBe(DeletionResult.Deleted);

        const { administrators: after } = await adminClient.query<
            GetAdministrators.Query,
            GetAdministrators.Variables
        >(GET_ADMINISTRATORS);

        expect(after.totalItems).toBe(1);
    });
});

export const ADMINISTRATOR_FRAGMENT = gql`
    fragment Administrator on Administrator {
        id
        firstName
        lastName
        emailAddress
    }
`;

export const GET_ADMINISTRATORS = gql`
    query GetAdministrators {
        administrators {
            items {
                ...Administrator
            }
            totalItems
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;

export const GET_ADMINISTRATOR = gql`
    query GetAdministrator($id: ID!) {
        administrator(id: $id) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;

export const CREATE_ADMINISTRATOR = gql`
    mutation CreateAdministrator($input: CreateAdministratorInput!) {
        createAdministrator(input: $input) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;

export const UPDATE_ADMINISTRATOR = gql`
    mutation UpdateAdministrator($id: ID!, $input: UpdateAdministratorInput!) {
        updateAdministrator(id: $id, input: $input) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;

export const DELETE_ADMINISTRATOR = gql`
    mutation DeleteAdministrator($id: ID!) {
        deleteAdministrator(id: $id) {
            message
            result
        }
    }
`;

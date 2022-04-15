import { gql } from 'apollo-server-express';
import { CUSTOMER_FRAGMENT } from '../fragments/customer.fragments';

export const GET_CUSTOMERS = gql`
    query GetCustomers {
        customers {
            id
            firstName
            lastName
            title
            emailAddress
            phoneNumber
        }
    }
`;

export const GET_CUSTOMER = gql`
    query GetCustomer($id: String!) {
        customer(customerId: $id) {
            ...Customer
        }
    }
    ${CUSTOMER_FRAGMENT}
`;

export const GET_CUSTOMER_WITH_USER = gql`
    query GetCustomerWithUser($id: String!) {
        customer(customerId: $id) {
            id
            user {
                id
                identifier
                verified
            }
        }
    }
`;

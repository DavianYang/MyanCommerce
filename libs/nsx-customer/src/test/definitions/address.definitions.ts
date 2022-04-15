import { gql } from 'apollo-server-express';

export const CREATE_ADDRESS = gql`
    mutation CreateAddress($id: String!, $input: CreateAddressInput!) {
        createAddress(customerId: $id, input: $input) {
            id
            fullName
            company
            streetLine1
            streetLine2
            city
            province
            postalCode
            country {
                code
                name
            }
            phoneNumber
            defaultShippingAddress
            defaultBillingAddress
        }
    }
`;

export const UPDATE_ADDRESS = gql`
    mutation UpdateAddress($id: String!, $input: UpdateAddressInput!) {
        updateAddress(addressId: $id, input: $input) {
            id
            defaultShippingAddress
            defaultBillingAddress
            country {
                code
                name
            }
        }
    }
`;

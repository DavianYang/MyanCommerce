import { gql } from 'apollo-server-express';
import { ADDRESS_FRAGMENT } from './address.fragments';

export const CUSTOMER_FRAGMENT = gql`
    fragment Customer on CustomerDto {
        id
        title
        firstName
        lastName
        phoneNumber
        emailAddress
        user {
            id
            identifier
            verified
            lastLogin
        }
        addresses {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;

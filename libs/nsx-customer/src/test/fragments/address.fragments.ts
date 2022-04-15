import { gql } from 'apollo-server-express';

export const ADDRESS_FRAGMENT = gql`
    fragment Address on AddressDto {
        id
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
    }
`;

import { Field, InputType, PickType } from '@nestjs/graphql';

import { AddressDto } from '../address.model';

@InputType()
export class CreateAddressInput extends PickType(
    AddressDto,
    [
        'fullName',
        'company',
        'streetLine1',
        'streetLine2',
        'city',
        'province',
        'postalCode',
        'phoneNumber',
        'defaultShippingAddress',
        'defaultBillingAddress',
    ],
    InputType,
) {
    @Field(() => String, { nullable: true })
    countryCode?: string | null;
}

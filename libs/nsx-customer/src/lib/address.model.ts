import { Field, ObjectType } from '@nestjs/graphql';
import { Address } from '@prisma/client';

import { BaseModel } from '@myancommerce/nsx-common';
import { CountryDto } from '@myancommerce/nsx-country';

@ObjectType()
export class AddressDto extends BaseModel implements Partial<Address> {
    @Field(() => String, { nullable: true })
    fullName?: string;

    @Field(() => String, { nullable: true })
    company?: string;

    @Field(() => String)
    streetLine1!: string;

    @Field(() => String, { nullable: true })
    streetLine2?: string;

    @Field(() => String, { nullable: true })
    city?: string;

    @Field(() => String, { nullable: true })
    province?: string;

    @Field(() => String, { nullable: true })
    postalCode?: string;

    @Field(() => CountryDto)
    country?: CountryDto;

    @Field(() => String, { nullable: true })
    phoneNumber?: string;

    @Field(() => Boolean, { nullable: true })
    defaultShippingAddress?: boolean;

    @Field(() => Boolean, { nullable: true })
    defaultBillingAddress?: boolean;
}

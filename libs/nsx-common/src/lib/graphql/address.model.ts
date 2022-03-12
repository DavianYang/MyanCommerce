import { Field, ObjectType } from '@nestjs/graphql';

import { BaseModel } from './base.model';
import { CountryDto } from './country.model';

@ObjectType()
export class AddressDto extends BaseModel {
    @Field({ nullable: true })
    fullName: string;

    @Field({ nullable: true })
    company: string;

    @Field()
    streetLine1!: string;

    @Field({ nullable: true })
    streetLine2: string;

    @Field()
    city: string;

    @Field()
    province: string;

    @Field()
    postalCode: string;

    @Field(() => CountryDto)
    country!: CountryDto;

    @Field()
    phoneNumber: String;

    @Field()
    defaultShippingAddress: string;

    @Field()
    defaultBillingAddress: boolean;
}

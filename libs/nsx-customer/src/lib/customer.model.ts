import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from '@prisma/client';
import { BaseModel } from '@myancommerce/nsx-common';
import { UserDto } from '@myancommerce/nsx-user';

import { AddressDto } from './address.model';

@ObjectType()
export class CustomerDto extends BaseModel implements Partial<Customer> {
    @Field(() => String)
    firstName!: string;

    @Field(() => String)
    lastName!: string;

    @Field(() => String)
    emailAddress!: string;

    @Field(() => String, { nullable: true })
    phoneNumber?: string | null;

    @Field(() => String, { nullable: true })
    title: string;

    @Field(() => [AddressDto])
    addresses?: AddressDto[];

    @Field(() => UserDto)
    user?: UserDto;

    @Field(() => Date, { nullable: true })
    deletedAt?: Date | null;
}

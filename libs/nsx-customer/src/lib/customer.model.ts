import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from '@prisma/client';
import { BaseModel } from '@myancommerce/nsx-common';
import { UserDto } from '@myancommerce/nsx-user';

@ObjectType()
export class CustomerDto extends BaseModel implements Partial<Customer> {
    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    emailAddress!: string;

    @Field(() => String, { nullable: true })
    phoneNumber: string | null;

    @Field({ nullable: true })
    title: string;

    // @Field(() => AddressDto)
    // address!: AddressDto[];

    @Field(() => UserDto)
    user?: UserDto;
}

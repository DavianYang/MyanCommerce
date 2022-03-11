import { Field, InputType } from '@nestjs/graphql';
import { BaseModel } from '@myancommerce/nsx-common';

@InputType()
export class CreateAdministratorInput {
    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    emailAddress!: string;

    @Field(() => [Number])
    roleIds!: number[];
}

@InputType()
export class UpdateAdministratorInput {
    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    emailAddress!: string;

    @Field(() => [Number])
    roleIds!: number[];
}

@InputType()
export class AdministratorListOptions extends BaseModel {
    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    emailAddress!: string;
}

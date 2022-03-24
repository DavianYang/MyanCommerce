import { Field, ObjectType } from '@nestjs/graphql';

import { BaseModel } from '@myancommerce/nsx-common';

@ObjectType()
export class CountryDto extends BaseModel {
    @Field(() => String)
    code!: string;

    @Field(() => String)
    name!: string;

    @Field(() => Boolean)
    enabled!: boolean;
}

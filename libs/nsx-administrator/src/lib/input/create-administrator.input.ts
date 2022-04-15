import { Field, InputType, PickType } from '@nestjs/graphql';
import { AdministratorDto } from '../administrator.model';

@InputType()
export class CreateAdministratorInput extends PickType(
    AdministratorDto,
    ['firstName', 'lastName', 'emailAddress'],
    InputType,
) {
    @Field(() => [Number])
    roleIds!: number[];

    @Field(() => String)
    password: string;
}

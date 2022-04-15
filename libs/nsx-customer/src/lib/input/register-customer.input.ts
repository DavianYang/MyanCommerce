import { Field, InputType, PickType } from '@nestjs/graphql';
import { CustomerDto } from '../customer.model';

@InputType()
export class RegisterCustomerInput extends PickType(
    CustomerDto,
    ['title', 'firstName', 'lastName', 'emailAddress', 'phoneNumber'],
    InputType,
) {
    @Field(() => String, { nullable: true })
    password?: string;
}

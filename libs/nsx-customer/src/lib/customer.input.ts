import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { CustomerDto } from './customer.model';

@InputType()
export class CreateCustomerInput extends PickType(
    CustomerDto,
    ['title', 'firstName', 'lastName', 'emailAddress', 'phoneNumber'],
    InputType,
) {}

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {}

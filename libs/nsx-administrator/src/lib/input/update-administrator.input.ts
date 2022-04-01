import { InputType, PartialType } from '@nestjs/graphql';
import { CreateAdministratorInput } from './create-administrator.input';

@InputType()
export class UpdateAdministratorInput extends PartialType(
    CreateAdministratorInput,
) {}

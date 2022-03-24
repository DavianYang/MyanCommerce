import { InputType, PickType } from '@nestjs/graphql';

import { CountryDto } from '../country.model';

@InputType()
export class CreateCountryInput extends PickType(
    CountryDto,
    ['name', 'code', 'enabled'],
    InputType,
) {}

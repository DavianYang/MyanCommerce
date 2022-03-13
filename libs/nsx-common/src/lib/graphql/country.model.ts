import { Field, ObjectType } from '@nestjs/graphql';

import { BaseModel } from './base.model';
import { LanguageCode } from './language-code.enum';

@ObjectType()
export class CountryDto extends BaseModel {
    @Field(() => LanguageCode)
    languageCode!: LanguageCode;

    @Field()
    code!: string;

    @Field()
    name!: string;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { DeletionResult } from './common.enums';

@ObjectType()
export class Success {
    @Field(() => Boolean)
    success: boolean;
}

@ObjectType()
export class DeletionResponse {
    @Field(() => DeletionResult)
    result!: DeletionResult;

    @Field(() => String, { nullable: true })
    message?: string;
}

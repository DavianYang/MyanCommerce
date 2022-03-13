import { Args, ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
    @Field({ nullable: true })
    cursor?: string;

    @Field(() => Int, { nullable: true })
    take?: number;

    @Field(() => Int, { nullable: true })
    skip?: number;
}

export const Input = () => Args('input');

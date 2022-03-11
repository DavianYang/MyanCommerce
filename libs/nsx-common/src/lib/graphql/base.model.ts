import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class Node {
    @Field(() => ID)
    id: string;
}

@ObjectType({ isAbstract: true })
export abstract class BaseModel extends Node {
    @Field({ nullable: false })
    createdAt: Date;

    @Field({ nullable: false })
    updatedAt: Date;
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserEntity = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const gqlExecutionContext = GqlExecutionContext.create(ctx);

        return gqlExecutionContext.getContext().request.user;
    },
);

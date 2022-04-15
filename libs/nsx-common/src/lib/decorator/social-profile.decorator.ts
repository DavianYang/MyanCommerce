import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const SocialProfile = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const profile =
            GqlExecutionContext.create(ctx).getContext().request.user;
        return profile;
    },
);

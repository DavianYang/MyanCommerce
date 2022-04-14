import { GqlExecutionContext } from '@nestjs/graphql';

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SocialAuthGuard extends AuthGuard('google') {
    constructor() {
        super();
    }

    override async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext();
        const { input } = ctx.getArgs();

        request.body = {
            ...request.body,
            access_token: input.accessToken,
            provider: input.provider,
        };
        return true;
    }

    getRequest(context: GqlExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext();
        const { input } = ctx.getArgs();

        request.body = {
            ...request.body,
            access_token: input.accessToken,
            provider: input.provider,
        };

        return request;
        // const request = ctx.getContext().request;

        // const { input } = ctx.getArgs();

        // request.body = {
        //     ...request.body,
        //     access_token: input.accessToken,
        //     provider: input.provider,
        // };

        // console.log('Body', request.body);
        // return request;
    }
}

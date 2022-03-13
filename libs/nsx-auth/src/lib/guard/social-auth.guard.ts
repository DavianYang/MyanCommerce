import { GqlExecutionContext } from '@nestjs/graphql';
import { BaseAuthGuard } from './base-auth-guard';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SocialAuthGuard extends BaseAuthGuard() {
    getRequest(context: GqlExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().request;

        const { input } = ctx.getArgs();

        request.body = {
            ...request.body,
            access_token: input.accessToken,
            provider: input.provider,
        };

        console.log('Body', request.body);
        return request;
    }
}

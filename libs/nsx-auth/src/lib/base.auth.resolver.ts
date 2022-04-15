import { Request as HttpRequest, Response as HttpResponse } from 'express';
import { User } from '@prisma/client';

import { isGraphQlErrorResult } from '@myancommerce/nsx-error';
import { CurrentUser, UserService } from '@myancommerce/nsx-user';

import { AuthService } from './auth.service';
import { LoginInput } from './input/login.input';
import { ConfigService } from '@myancommerce/nsx-config';
import { ApiType } from '@myancommerce/nox-common';
import { setSessionToken } from '@myancommerce/nsx-session';

export class BaseAuthResolver {
    constructor(
        protected configService: ConfigService,
        protected authService: AuthService,
        protected userService: UserService,
    ) {}

    async me(apiType: ApiType) {}

    async baseLogin(
        req: HttpRequest,
        res: HttpResponse,
        apiType: string,
        inputArgs: LoginInput,
    ) {
        return await this.authenticateAndCreateSession(req, res, apiType, {
            input: { ['local']: inputArgs },
        });
    }

    async authenticateAndCreateSession(
        req: HttpRequest,
        res: HttpResponse,
        apiType: string,
        inputArgs: any,
    ): Promise<any> {
        const [method, data] = Object.entries(inputArgs.input)[0];

        const sessionResult = await this.authService.authenticate(
            apiType,
            method,
            data,
        );

        if (isGraphQlErrorResult(sessionResult)) {
            return sessionResult;
        }

        setSessionToken({
            req,
            res,
            authTokenHeaderKey: this.configService.get(
                'authConfig.authTokenHeaderKey',
            ),
            tokenMethod: this.configService.get('authConfig.tokenMethod'),
            rememberMe: inputArgs.rememberMe || false,
            sessionToken: sessionResult.token,
        });

        return this.publiclyAccessibleUser(sessionResult.user);
    }

    protected publiclyAccessibleUser(user: User): CurrentUser {
        return {
            id: user.id,
            identifier: user.identifier,
        };
    }
}

import { Request as HttpRequest, Response as HttpResponse } from 'express';
import { forwardRef, Inject } from '@nestjs/common';
import { Context, Mutation, Resolver } from '@nestjs/graphql';

import { Input } from '@myancommerce/nsx-common';
import { ConfigService } from '@myancommerce/nsx-config';
import { UserService } from '@myancommerce/nsx-user';

import { AuthService } from './auth.service';
import { BaseAuthResolver } from './base.auth.resolver';
import { LoginInput } from './input/login.input';
import { LoginAdminResult } from './result/login-admin.result';

@Resolver()
export class AdminAuthResolver extends BaseAuthResolver {
    constructor(
        configService: ConfigService,
        authService: AuthService,
        @Inject(forwardRef(() => UserService))
        userService: UserService,
    ) {
        super(configService, authService, userService);
    }

    @Mutation(() => LoginAdminResult)
    async loginAdmin(
        @Context('req') req: HttpRequest,
        @Context('res') res: HttpResponse,
        @Input() inputArgs: LoginInput,
    ) {
        const apiType = 'admin';

        return await super.baseLogin(req, res, apiType, inputArgs);
    }
}

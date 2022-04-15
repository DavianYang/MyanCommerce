import { Profile } from 'passport';
import { Request as HttpRequest, Response as HttpResponse } from 'express';
import { Query, Mutation, Resolver, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Input, SocialProfile } from '@myancommerce/nsx-common';
import {
    AuthenticationResult,
    AuthUserResponse,
    SocialAuthGuard,
    GqlJwtAuthGuard,
    ProfileEntity,
    AuthService,
    LoginShopResult,
    LoginInput,
    BaseAuthResolver,
} from '@myancommerce/nsx-auth';
import { UserDto, UserService } from '@myancommerce/nsx-user';
import {
    CustomerService,
    RegisterCustomerInput,
    RegisterCustomerResult,
    VerifyCustomerInput,
    VerifyCustomerResult,
} from '@myancommerce/nsx-customer';
import { isGraphQlErrorResult } from '@myancommerce/nsx-error';
import { setSessionToken } from '@myancommerce/nsx-session';
import { ConfigService } from '@myancommerce/nsx-config';

@Resolver()
export class ShopAuthResolver extends BaseAuthResolver {
    constructor(
        configService: ConfigService,
        authService: AuthService,
        userService: UserService,
        private customerService: CustomerService,
    ) {
        super(configService, authService, userService);
    }

    @UseGuards(GqlJwtAuthGuard)
    @Query(() => UserDto)
    async CurrentUser(@ProfileEntity() user: UserDto) {
        return await this.userService.findOne({
            where: { identifier: user.identifier },
        });
    }

    @UseGuards(SocialAuthGuard)
    @Mutation(() => AuthenticationResult)
    async loginSocial(@SocialProfile() profile: Profile) {
        console.log('Profile', profile);
        return new AuthUserResponse();
    }

    @Mutation(() => RegisterCustomerResult)
    async registerCustomerAccount(
        @Input() input: RegisterCustomerInput,
    ): Promise<typeof RegisterCustomerResult> {
        return await this.customerService.registerCustomerAccount(input);
    }

    @Mutation(() => LoginShopResult)
    async loginShop(
        @Context('req') req: HttpRequest,
        @Context('res') res: HttpResponse,
        @Input() inputArgs: LoginInput,
    ) {
        const apiType = 'shop';

        return await super.baseLogin(req, res, apiType, inputArgs);
    }

    @Mutation(() => VerifyCustomerResult)
    async verifyCustomerAccount(
        @Context('req') req: HttpRequest,
        @Context('res') res: HttpResponse,
        @Input() inputArgs: VerifyCustomerInput,
    ) {
        const result = await this.customerService.verifyCustomerEmailAddress(
            inputArgs.token,
            inputArgs.password || undefined,
        );

        if (isGraphQlErrorResult(result)) {
            return result;
        }

        const session =
            await this.authService.createAuthenticatedSessionForUser(
                result.user!,
                'local',
            );

        setSessionToken({
            req,
            res,
            sessionToken: session.token,
            rememberMe: true,
            authTokenHeaderKey: this.configService.get(
                'authConfig.authTokenHeaderKey',
            ),
            tokenMethod: this.configService.get('authConfig.tokenMethod'),
        });

        return this.publiclyAccessibleUser(session.user);
    }
}

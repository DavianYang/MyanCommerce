import { Profile } from 'passport';
import { Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

// import { UserService } from '@myancommerce/nsx-user';

// import { AuthService } from './auth.service';
import { AuthenticationResult } from './result/authentication.result';
import { AuthUserResponse } from './response/auth-user.response';
import { SocialProfile } from '@myancommerce/nsx-common';
// import { LoginSocialInput } from './auth.input';
import { SocialAuthGuard } from './guard/social-auth.guard';

@Resolver()
export class ShopAuthResolver {
    constructor() {} // private readonly userService: UserService, // private readonly authService: AuthService,

    @UseGuards(SocialAuthGuard)
    @Mutation(() => AuthenticationResult)
    async loginSocial(
        @SocialProfile() profile: Profile,
        // @Input() input: LoginSocialInput,
    ) {
        console.log('Profile', profile);
        return new AuthUserResponse();
    }
}

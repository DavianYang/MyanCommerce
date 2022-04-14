import { Profile } from 'passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@myancommerce/nsx-config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(readonly configSerivce: ConfigService) {
        super({
            clientID: configSerivce.get('socialAuthConfig.clientID'),
            clientSecret: configSerivce.get('socialAuthConfig.clientSecret'),
            callbackURL: 'http://localhost:3000/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ) {
        process.nextTick(function () {
            if (!profile) {
                return done(new UnauthorizedException(), false);
            }

            const { name, emails, photos } = profile;

            const user = {
                email: emails![0].value,
                firstName: name?.givenName,
                lastName: name?.familyName,
                picture: photos![0].value,
                accessToken,
            };

            return done(null, user);
        });
    }
}

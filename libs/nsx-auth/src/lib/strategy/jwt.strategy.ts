import { ExtractJwt, Strategy } from 'passport-jwt';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigService } from '@myancommerce/nsx-config';
import { UserService } from '@myancommerce/nsx-user';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        readonly configService: ConfigService,
        @Inject(forwardRef(() => UserService))
        readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('authConfig.jwtTokenSecret'),
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findOne({
            where: { identifier: payload.identifier },
            include: {
                roles: true,
            },
        });
        return user;
    }
}

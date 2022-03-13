import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('authConfig.jwtTokenSecret'),
        });
    }

    async validate(payload: any) {
        const user = await this.authService.getAuthUser(payload.identifier);
        return user;
    }
}

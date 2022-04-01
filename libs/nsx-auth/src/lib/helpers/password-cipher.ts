import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PasswordHashingStrategy } from '../strategy/password/password-hashing.strategy.interface';

@Injectable()
export class PasswordCipher {
    private passwordStrategy: PasswordHashingStrategy;

    constructor(private configService: ConfigService) {
        this.passwordStrategy = this.configService.get(
            'authConfig.passwordHashingStrategy',
        ) as PasswordHashingStrategy;
    }

    async hash(plaintext: string): Promise<string> {
        return await this.passwordStrategy.hash(plaintext);
    }

    async check(plaintext: string, hash: string): Promise<boolean> {
        return await this.passwordStrategy.check(plaintext, hash);
    }
}

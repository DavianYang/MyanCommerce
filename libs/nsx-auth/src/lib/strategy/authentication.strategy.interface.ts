import { InjectableStrategy } from '@myancommerce/nsx-common';
import { User } from '@prisma/client';

export interface AuthenticationStrategy<Data = unknown>
    extends InjectableStrategy {
    readonly name: string;
    authenticate(data: Data): Promise<User | false | string>;
}

import { AuthModule } from '@myancommerce/nsx-auth';
import { ConfigModule } from '@myancommerce/nsx-config';
import { CustomerModule } from '@myancommerce/nsx-customer';
import { UserModule } from '@myancommerce/nsx-user';
import { Module } from '@nestjs/common';
import { ShopAuthResolver } from './shop.auth.resolver';

@Module({
    imports: [ConfigModule, UserModule, CustomerModule, AuthModule],
    providers: [ShopAuthResolver],
})
export class ShopModule {}

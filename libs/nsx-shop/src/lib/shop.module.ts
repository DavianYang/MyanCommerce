import { AuthModule } from '@myancommerce/nsx-auth';
import { CustomerModule } from '@myancommerce/nsx-customer';
import { Module } from '@nestjs/common';
import { ShopAuthResolver } from './shop.auth.resolver';

@Module({
    imports: [CustomerModule, AuthModule],
    providers: [ShopAuthResolver],
})
export class ShopModule {}

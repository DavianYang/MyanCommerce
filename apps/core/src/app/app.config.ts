import { registerAs } from '@nestjs/config';
import { environment } from '../environments/environment';

export const appConfiguration = registerAs('appConfig', () => ({
    ...environment,
}));

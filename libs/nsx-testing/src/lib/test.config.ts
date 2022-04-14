import { registerAs } from '@nestjs/config';
import { testEnvironment } from './environments/test-environment';

export const testConfiguration = registerAs('testConfig', () => ({
    ...testEnvironment,
}));

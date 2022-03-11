import { registerAs } from '@nestjs/config';
import { testEnvironment } from './test-environment';

export const testConfiguration = registerAs('testConfig', () => ({
    ...testEnvironment,
}));

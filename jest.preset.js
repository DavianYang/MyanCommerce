module.exports = {
    testMatch: ['**/+(*.)+(e2e-spec|spec|test).+(ts|js)?(x)'],
    resolver: '@nrwl/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'js', 'mjs', 'html'],
    coverageReporters: ['html'],
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest',
    },
    testEnvironment: 'jsdom',
};
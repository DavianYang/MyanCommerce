module.exports = {
    displayName: 'nsx-customer',
    preset: '../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    transform: {
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
      },
      transformIgnorePatterns: [
        "node_modules/(?!variables/.*)"
      ],
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/libs/nsx-customer',
};

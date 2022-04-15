import { fail } from 'assert';
import { expect } from '@jest/globals';

export function assertThrowsWithMessage(
    operation: () => Promise<any>,
    message: string | (() => string),
) {
    return async () => {
        try {
            await operation();
            fail('Should have thrown');
        } catch (err: any) {
            console.log(err);
            const messageStr =
                typeof message === 'function' ? message() : message;

            expect(err.message).toEqual(expect.stringContaining(messageStr));
        }
    };
}

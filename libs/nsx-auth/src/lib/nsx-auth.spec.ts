import { nsxAuth } from './nsx-auth';

describe('nsxAuth', () => {
    it('should work', () => {
        expect(nsxAuth()).toEqual('nsx-auth');
    });
});

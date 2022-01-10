import { build } from '../helper';

describe('Root tests', () => {
    const app = build();

    it('default root route', async () => {
        const res = await app.inject({
            url: '/',
        });
        expect(JSON.parse(res.payload)).toEqual({ root: true });
    });
});

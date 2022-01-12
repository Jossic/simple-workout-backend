import { build } from '../helper';

describe.skip('Root tests', () => {
    const app = build();

    it.skip('default root route', async () => {
        const res = await app.inject({
            url: '/',
        });
        expect(JSON.parse(res.payload)).toEqual({ root: true });
    });
});

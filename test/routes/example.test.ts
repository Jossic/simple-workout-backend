import { FastifyInstance } from 'fastify';
import { build } from '../helper';

describe('ex tests', () => {
    let app: FastifyInstance;
    beforeAll(async () => {
        app = await build();
    });

    // Tear down our app after we are done
    afterAll(async () => {
        await app.close();
    });
    it('example is loaded', async () => {
        const app = await build();

        const res = await app.inject({
            url: '/example',
        });

        expect(res.payload).toBe('this is an example');
    });
});

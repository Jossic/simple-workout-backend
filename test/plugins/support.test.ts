import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { build } from '../helper';
import Support from '../../src/plugins/support';

describe('Support tests', () => {
    let app: FastifyInstance;
    beforeAll(async () => {
        app = await build();
    });

    // Tear down our app after we are done
    afterAll(async () => {
        await app.close();
    });

    test('support works standalone', async () => {
        const fastify = Fastify();
        void fastify.register(Support);
        await fastify.ready();

        expect(fastify.someSupport()).toBe('hugs');
    });
});

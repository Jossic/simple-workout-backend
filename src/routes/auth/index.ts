import { FastifyPluginAsync } from 'fastify';

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async function (request, reply) {
        return 'this is the auth route';
    });
    fastify.post('/signin', async function (request, reply) {
        // fastify.store.User // Connect to db
        return 'this is the auth route';
    });
    fastify.post('/signup', async function (request, reply) {
        return 'this is the auth route';
    });
};

export default auth;

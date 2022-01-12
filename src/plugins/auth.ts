import fp from 'fastify-plugin';
import cookie from 'fastify-cookie';
import session from 'fastify-session';
import grant from 'grant';

export default fp(async (fastify) => {
    return fastify
        .register(cookie)
        .register(session, {
            secret: 'grantsdfgdhgfdf4mn89fg4m65hgf1m65g4h68_4d61fg6m1d64g_h6gm4n684dm6gh46fx5n1m6fg',
            cookie: { secure: false },
        })
        .register(
            grant.fastify()({
                defaults: {
                    origin: process.env.API_ORIGIN,
                    transport: 'session',
                    state: true,
                },
                google: {
                    key: process.env.GOOGLE_CLIENT_ID,
                    secret: process.env.GOOGLE_CLIENT_SECRET,
                    scope: ['openid'],
                    nonce: true,
                    custom_params: { access_type: 'offline' },
                    callback: '/',
                },
            }),
        );
});

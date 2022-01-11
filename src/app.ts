import { join } from 'path';
import AutoLoad from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';

function loadEnv(key: string) {
    const val = process.env[key];

    if (!val) {
        throw new Error(`${key} is a required env variable`);
    }

    return val;
}

type AppConfig = typeof appConfig;
const appConfig = {
    google: {
        client_id: loadEnv('GOOGLE_CLIENT_ID'),
        client_secret: loadEnv('GOOGLE_CLIENT_SECRET'),
    },
    apiOrigin: loadEnv('API_ORIGIN'),
    mongo_uri: loadEnv('MONGO_URI'),
};

const app: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    // Place here your custom code!
    fastify.decorate('appConfig', appConfig);

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'plugins'),
        options: opts,
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'routes'),
        options: opts,
    });
};

export default app;
export { app };

declare module 'fastify' {
    export interface FastifyInstance {
        appConfig: AppConfig;
    }
}

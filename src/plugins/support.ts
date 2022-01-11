import fp from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt';
import { fastifyRequestContextPlugin } from 'fastify-request-context';
import * as mongoose from 'mongoose';
import { UserModel, UserSchema } from '../models/UserModel';

export interface SupportPluginOptions {
    // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
    fastify.register(fastifyRequestContextPlugin);

    // JWT Setup
    fastify.register(fastifyJwt, {
        secret: 'mysuperSecRetdfb5fn1f6m1hg6f4-ddf',
        sign: {
            expiresIn: '15 days',
        },
    });

    fastify.decorate('generateJwt', (email: string) => {
        return fastify.jwt.sign({ email });
    });

    const db = await mongoose.connect(fastify.appConfig.mongo_uri);
    console.log(`MongoDB Connected: ${db.connection.host}`);

    fastify.decorate('store', {
        User: db.model('User', UserSchema),
        db,
    });
});

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
    export interface FastifyInstance {
        generateJwt: (email: string) => string;
        store: {
            User: mongoose.Model<UserModel>;
            db: typeof mongoose;
        };
    }
}

declare module 'fastify-request-context' {
    interface RequestContextData {
        user: UserModel;
    }
}

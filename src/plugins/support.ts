import fp from 'fastify-plugin';
import * as mongoose from 'mongoose';
import { UserModel, UserSchema } from '../models/UserModel';

export interface SupportPluginOptions {
    // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
    const db = await mongoose.connect(fastify.appConfig.mongo_uri);

    fastify.decorate('store', {
        User: db.model('User', UserSchema),
        db,
    });
});

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
    export interface FastifyInstance {
        store: {
            User: mongoose.Model<UserModel>;
            db: typeof mongoose;
        };
    }
}

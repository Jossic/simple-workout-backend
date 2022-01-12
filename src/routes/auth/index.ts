import { FastifyPluginAsync } from 'fastify';
import * as bcrypt from 'bcrypt';

//types
import { SigninBody, SigninOpts, SignupBody, SignupOpts } from './types';

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post<{ Body: SignupBody }>(
        '/signup',
        SignupOpts,
        async (request, reply) => {
            try {
                const { password, email } = request.body;
                const userExists = await fastify.store.User.findOne({ email });

                if (userExists) {
                    reply
                        .status(400)
                        .send({ message: 'Cet utilisateur existe déja' });
                }
                const hash = await bcrypt.hash(password, 10);

                const user = new fastify.store.User({
                    ...request.body,
                    password: hash,
                });

                await user.save();

                const token = fastify.generateJwt(user.email);

                reply.status(201).send({
                    ...user.toObject(),
                    token,
                    message: 'Utilisateur crée avec succés',
                });
            } catch (error) {
                request.log.error('Erreur lors du signup');
            }
        },
    );
    fastify.post<{ Body: SigninBody }>(
        '/signin',
        SigninOpts,
        async (request, reply) => {
            try {
                const { email, password } = request.body;

                const user = await fastify.store.User.findOne({ email });

                if (!user) {
                    return reply.status(404).send();
                }

                bcrypt.compare(password, user.password, (err, isValid) => {
                    if (err || !isValid) {
                        return reply.getHttpError(
                            401,
                            'Identifiant et/ou mot de passe invalide',
                        );
                    }

                    const token = fastify.generateJwt(user.email);

                    return reply
                        .status(200)
                        .send({ ...user.toObject(), token });
                });
            } catch (error) {
                request.log.error('Erreur lors du sigin');
            }
        },
    );
};

export default auth;

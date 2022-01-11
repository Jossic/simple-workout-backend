import { Type, Static } from '@sinclair/typebox';
import { RouteShorthandOptions } from 'fastify';

// Signup
const SignupRequest = Type.Object({
    firstName: Type.String(),
    lastName: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String(),
});
const SignupResponse = Type.Object({
    firstName: Type.String(),
    lastName: Type.String(),
    email: Type.String(),
    token: Type.String(),
});

export const SignupOpts: RouteShorthandOptions = {
    schema: {
        body: SignupRequest,
        response: {
            201: SignupResponse,
        },
    },
};

export type SignupBody = Static<typeof SignupRequest>;

// Signin
const SigninRequest = Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String(),
});

export const SigninOpts: RouteShorthandOptions = {
    schema: {
        body: SigninRequest,
        response: {
            200: SignupResponse,
        },
    },
};

export type SigninBody = Static<typeof SigninRequest>;

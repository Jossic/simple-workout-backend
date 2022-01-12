import { build } from '../../helper';

describe('Auth /signup route test', () => {
    const app = build();

    it('should return 201 on /signup route', async () => {
        const payload = {
            firstName: 'Jossic',
            lastName: 'Lapierre',
            email: 'nouvel.utffdji452l@gmail.com',
            password: '123456',
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        const res = await app.inject({
            method: 'POST',
            url: '/auth/signup',
            payload,
            headers,
        });

        if (res.statusCode === 400) {
            expect(JSON.parse(res.payload)).toEqual({
                message: 'Cet utilisateur existe déja',
            });
        } else {
            expect(res.statusCode).toBe(201);
            expect(JSON.parse(res.payload).message).toBe(
                'Utilisateur crée avec succés',
            );
        }
    });
});

// describe('Auth /signin route test', () => {
//     const app = build();

//     it('should return code 200 on /signin route', async () => {
//         const res = await app.inject({
//             method: 'POST',
//             url: '/auth/signin',
//         });
//         console.log('status code: ', res.statusCode);
//         // expect(JSON.parse(res.payload)).toEqual({ root: true });
//     });
// });

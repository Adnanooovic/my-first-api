import { expect, test } from 'vitest';
import got from 'got';

const client  = got.extend({
    prefixUrl: 'http://localhost:3000/',
    responseType:  'json',
    throwHttpErrors: false,
});

const d = new Date().getTime();
const email = `johndoe${d}@gmail.com`;

test('[VALID] POST /signup', async ()=> {
    const res = await client.post('signup', {
        json: {
            email,
            username: "test",
            password: 'password',
        },
        responseType: 'json',
    })
    const data = res.body;
    expect(res.statusCode).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data.email).toBe(email);
    expect(data).to.not.have.property('password');
})

test('[VALID] POST /login', async ()=> {
    const res = await client.post('login', {
        json: {
            email,
            password: 'password',
        },
        responseType: 'json',
    })
    const data = res.body;
    expect(res.statusCode).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data.email).toBe(email);
    expect(data).to.not.have.property('password');
})
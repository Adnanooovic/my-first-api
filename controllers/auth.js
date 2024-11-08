import { userRepository } from "../repositories/user.js";
import { CreateUserDto, GetUserDto, LoginDto } from "../dtos/UserDtos.js";
import JWT from 'jsonwebtoken';
import { createHash } from  'crypto';


export function registerAuthRoutes(fastify){
    
    fastify.post('/login', { schema: LoginDto }, async function login(request, reply) {
        const email = request.body.email;
        const body =  request.body;
        const password = createHash('sha1')
            .update(request.body.password+process.env.PASSWORD_SALT)
            .digest('hex');
        const user = await userRepository.getuserByCredentials(email, password);
        if(!user){
            throw new Error('Invalid credentials');
        }
        user.token = JWT.sign({ id: user.id }, process.env.JWT_SECRET);
        return user;
    });

    fastify.post('/signup', { schema: CreateUserDto }, async function signup(request, reply) {
        const email = request.body.email;
        const username = request.body.username;
        const password = createHash('sha1')
            .update(request.body.password+process.env.PASSWORD_SALT)
            .digest('hex');
        const user  = {email, username, password}
        return await userRepository.createUser(user);
    });

    fastify.get('/user/:id', { schema: GetUserDto }, async function getUser(request, reply) {
        const id = parseInt(request.params.id);
        return userRepository.getUser(id);
    });
    
};


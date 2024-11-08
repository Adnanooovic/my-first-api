import { prisma } from '../services/db.js'
import { NotFoundError } from '../utils/error.js';

export const userRepository = {
    getuserByCredentials: async (email, password) => {
        const user = await prisma.users.findFirst({
            where: {
                email: email,
                password: password
            }
        });
        if(!user){
            throw new NotFoundError('User not found');
        }
        return user;
    },
    getUser: async (id) => {
        const user = await prisma.users.findUnique({
            where: {
                id: id
            }
        });
        if(!user){
            throw new NotFoundError('User not found');
        }
        return user;
    },

    createUser: async (user) => {
        const newUser = await  prisma.users.create({
            data: user
        });
        return newUser;
    },
}
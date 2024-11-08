import { postRepository } from "../repositories/post.js";

export function registerUserRoutes(fastify){

    fastify.get('/users', async function getUsers(request, reply) {
        const page = request.query.page || 1;
        const limit = request.query.limit || 10;
        return await postRepository.getUsers(page, limit);

    });
    
    fastify.get('/users/:id', async function getUser(request, reply) {
        const id = parseInt(request.params.id)
        return await postRepository.getUser(id);
    });
    fastify.post('/users', async function createUser(request, reply) {
        const body = request.body;
        return await postRepository.createUser(body);
    });

    fastify.put('/users/:id', async function updateUser(request, reply) {
        const id = parseInt(request.params.id);
        const body = request.body;
        return await postRepository.updateUser(id, body);
    });

    fastify.delete('/users/:id', async function deleteUser(request, reply) {
        const id = parseInt(request.params.id);
        return await postRepository.deleteUser(id);
    });
}
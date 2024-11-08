import { postRepository } from "../repositories/post.js";
import { CreatePostDto, GetPostDto, GetPostsDto, UpdatePostsDto, DeletePostsDto } from "../dtos/PostDtos.js";

export function registerPostRoutes(fastify) {

    fastify.get('/posts', { schema: GetPostsDto }, async function getPosts(request, reply) {
        const page = request.query.page || 1;
        const limit = request.query.limit || 10;
        return await postRepository.getPosts(page, limit);

    });

    fastify.get('/posts/:id', { schema: GetPostDto }, async function getPost(request, reply) {
        const id = parseInt(request.params.id)
        return await postRepository.getPost(id);
    });
    fastify.post('/posts', { preHandler: fastify.auth([fastify.authUser]), schema: CreatePostDto }, async function createPost(request, reply) {
        const userId = request.user.id;
        const newPost = request.body;
        newPost.authorId = userId;
        return await postRepository.createPost(newPost);
    });

    fastify.put('/posts/:id', { preHandler: fastify.auth([fastify.authUser]), schema: UpdatePostsDto }, async function updatePost(request, reply) {

        const id = parseInt(request.params.id);
        const body = request.body;
        const authUser = request.user;
        const existingPost = await postRepository.getPost(id);
        if(authUser.id !== existingPost.authorId){
            throw new Error('You are not the author of this post');
        }
        return await postRepository.updatePost(id, body);
    });

    fastify.delete('/posts/:id', { preHandler: fastify.auth([fastify.authUser]), schema: DeletePostsDto }, async function deletePost(request, reply) {

        const id = parseInt(request.params.id);
        return await postRepository.deletePost(id);
    });
}
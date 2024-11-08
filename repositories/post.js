import { prisma } from '../services/db.js'
import { NotFoundError } from '../utils/error.js';

export const postRepository = {
    getPosts:async (page, limit) => {
        const post = await prisma.posts.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                author: true
            }
        });
    },

    getPost: async (id) => {
        const post = await prisma.posts.findFirst({
            where: {
                id: id
            },
            include: {
                author: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        if(!post){
            throw new NotFoundError('Post not found');
        }
        return post;
    },

    createPost: async (post) => {
        const newPost = await  prisma.posts.create({
            data: post,
            include: {
                author: true
            }
        });
        return newPost;
    },
    

    updatePost: async (id, post,) => {
        const oldpost = await prisma.posts.findFirst({
            where: {
                id: id
            }
        });
        if(oldpost.authorId !== post.authorId)


        if(!oldpost){
            throw new NotFoundError('Post not found');
        }
        const updatedPost = await prisma.posts.update({
            where: {
                id: id
            },
            data: post,
            include: {
                author: true
            }
        });
        return updatedPost;
    },

    deletePost: async (id) => {
        const index = await prisma.posts.delete({
            where: {
                id: id
            }
    });
    },
}
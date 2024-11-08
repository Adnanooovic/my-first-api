import { prisma } from '../services/db.js'
import { NotFoundError } from '../utils/error.js';

export const categoryRepository = {
    getCategories:async (page, limit) => {
        const category = await prisma.categories.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                author: true
            }
        });
    },

    getCategory: async (id) => {
        const category = await prisma.categories.findFirst({
            where: {
                id: id
            },
            include: {
                author: true
            }
        });
        if(!category){
            throw new NotFoundError('Category not found');
        }
        return category;
    },

    createCategory: async (post) => {
        const newCategory = await  prisma.categories.create({
            data: post,
            include: {
                author: true
            }
        });
        return newCategory;
    },

    updateCategory: async (id, post,) => {
        const oldcategory = await prisma.categories.findFirst({
            where: {
                id: id
            }
        });
        if(oldcategory.authorId !== category.authorId)


        if(!oldcategory){
            throw new NotFoundError('Category not found');
        }
        const updatedCategory = await prisma.categories.update({
            where: {
                id: id
            },
            data: category,
            include: {
                author: true
            }
        });
        return updatedCategory;
    },

    deleteCategory: async (id) => {
        const index = await prisma.categories.delete({
            where: {
                id: id
            }
    });
    return
    },
}
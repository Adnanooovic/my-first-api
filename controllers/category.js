import { categoryRepository } from "../repositories/category.js";
import { CreateCategoryDto, GetCategoryDto, GetCategoriesDto, UpdateCategoryDto, DeleteCategoryDto } from "../dtos/CategoryDtos.js";

export function registerCategoryRoutes(fastify) {

    fastify.get('/categories', { schema: GetCategoriesDto }, async function getCategories(request, reply) {
        const page = request.query.page || 1;
        const limit = request.query.limit || 10;
        return await categoryRepository.getCategories(page, limit);

    });

    fastify.get('/categories/:id', { schema: GetCategoryDto }, async function getCategory(request, reply) {
        const id = parseInt(request.params.id)
        return await categoryRepository.getCategory(id);
    });
    fastify.post('/categories', { preHandler: fastify.auth([fastify.authUser]), schema: CreateCategoryDto }, async function createCategory(request, reply) {
        const userId = request.user.id;
        const newCategory = request.body;
        newCategory.authorId = userId;
        return await categoryRepository.createCategory(newCategory);
    });

    fastify.put('/categories/:id', { preHandler: fastify.auth([fastify.authUser]), schema: UpdateCategoryDto }, async function updateCateg(request, reply) {

        const id = parseInt(request.params.id);
        const body = request.body;
        const authUser = request.user;
        const existingCategory = await categoryRepository.getCategory(id);
        if(authUser.id !== existingCategory.authorId){
            throw new Error('You are not the author of this category');
        }
        return await categoryRepository.updateCategory(id, body);
    });

    fastify.delete('/categories/:id', { preHandler: fastify.auth([fastify.authUser]), schema: DeleteCategoryDto }, async function deleteCategory(request, reply) {

        const id = parseInt(request.params.id);
        return await categoryRepository.deleteCategory(id);
    });
}
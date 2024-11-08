import { PublicUserDto } from "./UserDtos.js";

export const ExistingCategoryDto = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
    },
    required:  ['id', 'title']
};

export const CreateCategoryDto = {
    security: [{ token: [] }],
    body: {
        type: 'object',
        properties: {
            name: { type: 'string'},
        },
        required: ['name'],
    },
    response: {
        200: ExistingCategoryDto

    }
};

export const GetCategoriesDto = {
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'number'},
            limit: { type: 'number'},
        },
        required: ['title']
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id:  { type: 'number'},
                    title:  { type: 'string'},
                    content: { type: 'string'},
                },
                required:  ['id', 'title', 'content'],
            }

        }
    }
};

export const GetCategoryDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number'},
        },
        required: ['id']
    },
    response: {
        200: ExistingCategoryDto
    }
};

export const UpdateCategoryDto = {
    security: [{ token: [] }],
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            content: { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                title: { type: 'string' },
                content: { type: 'string' },
            },
            required: ['id', 'title'],
        }
    }
};

export const DeleteCategoryDto = {
    security: [{ token: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
        required: ['id'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
            required: ['message'],
        }
    }
};
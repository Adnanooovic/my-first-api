import { ExistingCategoryDto } from "./CategoryDtos.js";
import { PublicUserDto } from "./UserDtos.js";
const PostCategoryDto = {
    type: 'object',
    properties: {
        category: ExistingCategoryDto
    }
}
const ExistingPostDto = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
        author: PublicUserDto
    },
    required:  ['id', 'title', 'content']
};

export const CreatePostDto = {
    security: [{ token: [] }],
    body: {
        type: 'object',
        properties: {
            title: { type: 'string'},
            content: { type: 'string'},
        },
        required: ['title'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id:  { type: 'number'},
                title:  { type: 'string'},
                content: { type: 'string'},
            },
            required:  ['id', 'title'],
        }

    }
};

export const GetPostsDto = {
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
                    categories: {
                        type: 'array',
                        items: PostCategoryDto
                    }
                },
                required:  ['id', 'title', 'content'],
            }

        }
    }
};

export const GetPostDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number'},
        },
        required: ['id']
    },
    response: {
        200: ExistingPostDto
    }
};

export const UpdatePostsDto = {
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

export const DeletePostsDto = {
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


export const GetUserDto = {
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
                id: { type: 'number' },
                username: { type: 'string' },
                email: { type: 'string' },
            },
            required: ['id', 'username', 'email'],
        }
    }
};

export const CreateUserDto = {
    body: {
        type: 'object',
        properties: {
            username: { type: 'string' },
            email: { type: 'string', format: 'email' }, 
            password: { type: 'string'},
        },
        required: ['username', 'email', 'password'], 
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' }, // ID de l'utilisateur créé
                username: { type: 'string' },
                email: { type: 'string' },
            },
            required: ['id', 'username', 'email'], // Champs requis dans la réponse
        }
    }
};


export const DeleteUserDto = {
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

export const LoginDto = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string',},
            password: { type: 'string' },
        },
        required: ['email', 'password'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                username: { type: 'string' },
                email: { type: 'string' },
                token: { type: 'string' },
            },
            required: ['id', 'username', 'email', 'token'],
        },
    }
};

export const PublicUserDto = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        username: { type: 'string' }
    },
};

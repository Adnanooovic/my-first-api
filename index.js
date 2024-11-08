// On importe la framework
import Fastify from 'fastify'
import { registerPostRoutes } from './controllers/post.js';
import { registerAuthRoutes } from './controllers/auth.js';
import { registerCategoryRoutes } from './controllers/category.js';
import FastifyCors from '@fastify/cors';
import fastifyAuth from '@fastify/auth';
import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUI from '@fastify/swagger-ui';
import { registerAuthMiddlewares } from './middlewares/auth.js';
import { registerErrorMiddleware } from './middlewares/error.js';

// On l'initialise avec des options
const fastify = Fastify({
    logger: true,
    ajv: {
        customOptions: { removeAdditional: true }
    }
});

await fastify.register(FastifySwagger, {
    openapi: {
        components: {
            securitySchemes: {
                token: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
    },
});

await fastify.register(FastifySwaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'list',
    }
});

await fastify.register(fastifyAuth);

// Ajouter avant de lancer le serveur
registerErrorMiddleware(fastify);
registerAuthMiddlewares(fastify);
registerAuthRoutes(fastify);
registerPostRoutes(fastify);
registerCategoryRoutes(fastify);

// Enregistrer le plugin CORS
fastify.register(FastifyCors, {
    origin: process.env.NODE_ENV == 'production' ? 'exemple.com' : '*',
    methods:  ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});


// On déclare notre première route
fastify.get('/', async function handler(request, reply) {
    return { hello: 'world' }
});

// Et on lance le serveur
try {
    await fastify.listen({ port: 3000 })
    await fastify.ready();
} catch (err) {
    fastify.log.error(err)
    process.exitCode(1)
}

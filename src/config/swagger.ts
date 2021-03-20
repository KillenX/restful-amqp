export const swaggerConfig = {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Swagger for ',
            description: 'testing the fastify swagger api',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: `${process.env.HOST}:${process.env.PORT}`,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'pub', description: 'Publishing related end-points' },
            { name: 'admin', description: 'AMQP administration related end-points' },
            { name: 'sub', description: 'Subscription related end-points' }
        ],
    },
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    exposeRoute: true
}
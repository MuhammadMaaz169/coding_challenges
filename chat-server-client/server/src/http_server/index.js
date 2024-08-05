export const configureHttpServer = async (app) => {
    app
        .get('/', (request, reply, next) => {
            reply.status(200).send('Hello, world');
        })
    // .use('/api', api())

    app.setErrorHandler((error, request, reply) => {
        const status = error.statusCode ?? 500;
        const message = status === 500 ? 'Something went wrong' : error.message ?? 'Something went wrong';
        app.log.error(
            `[${request.method}] ${request.url} >> StatusCode:: ${status || 500}, Message:: ${error.message || 'Something went wrong'}`
        );
        return fail(reply, { message }, status);
    });

    await app.listen({ port: 3000 })
};

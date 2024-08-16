import { AsymmetricAuthentication } from "../common/jwt-manager.js";
import { fail } from "../common/response.js";
import { config } from "../config/index.js";
import { initializeRoutes } from "./plugins/initializeRoute.js";
import { initSwagger } from "./plugins/swagger.js";

export const configureHttpServer = async (app) => {

    AsymmetricAuthentication.initializeKeyStore();

    app.register(initSwagger);
	app.register(initializeRoutes, { prefix: `api/${config.apiVersion}` });

    // app
    //     .get('/', (request, reply, next) => {
    //         reply.status(200).send('Hello, world');
    //     })
    // .use('/api', api())

    app.setErrorHandler((error, request, reply) => {
        const status = error.statusCode ?? 500;
        return fail(reply, { message: error.message }, status);
    });

    await app.listen({ port: 3000 })
};

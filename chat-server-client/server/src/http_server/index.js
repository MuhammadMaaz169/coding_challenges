import { AsymmetricAuthentication } from "../common/jwt-manager.js";
import { fail } from "../common/response.js";
import { config } from "../config/index.js";
import { initializeRoutes } from "./plugins/initializeRoute.js";
import { initSwagger } from "./plugins/swagger.js";

export const configureHttpServer = async (app) => {
    

    AsymmetricAuthentication.initializeKeyStore();
    
    app.register(initSwagger);
	app.register(initializeRoutes, { prefix: `api/${config.apiVersion}` });

    app.setErrorHandler((error, request, reply) => {
        const status = error.statusCode ?? 500;
        return fail(reply, { message: error.message }, status);
    });

    await app.listen({ port: 4000 })
};

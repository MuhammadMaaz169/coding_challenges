import { authRoutes } from "../domains/auth/auth.route.js";
import { defaultRoute } from "../domains/default/index.route.js";

export const initializeRoutes = (server, _, done) => {
	const routes = [defaultRoute, authRoutes];
	routes.forEach((route) => {
		server.register(route);
	});
	done();
};

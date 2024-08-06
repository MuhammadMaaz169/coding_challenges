import { defaultRoute } from "../domains/default/index.route.js";

export const initializeRoutes = (server, _, done) => {
	const routes = [defaultRoute];
	routes.forEach((route) => {
		server.register(route);
	});
	done();
};

var path = require('path');

module.exports = function (server) {

	var Swaggerize = require('swaggerize-hapi');

	server.register({
			register: Swaggerize,
			options: {
				api: path.resolve(__dirname,'./config/jms-api.json'),
				handlers: path.resolve(__dirname,'./handlers'),
				cors: {
					origin: ['*']
				}
			}
		},
		function (err) {
			if (err) server.log(['error','server', 'api'], err);
		}
	);

}
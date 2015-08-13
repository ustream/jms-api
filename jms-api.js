var path = require('path');
var Swaggerize = require('swaggerize-hapi');

module.exports = function (server) {

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
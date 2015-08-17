var path = require('path');
var Swaggerize = require('swaggerize-hapi');


var apiHosts = {
	local: '127.0.0.1:1337',
	beta: 'jms-beta.ustream.tv',
	live: 'jms.ustream.tv'
}

module.exports = function (server) {

	var api = require(path.resolve(__dirname,'./config/jms-api.json'));

	if (server.settings.app.api) {
		api.host = server.settings.app.api.host
	}

	server.register({
			register: Swaggerize,
			options: {
				api: api,
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
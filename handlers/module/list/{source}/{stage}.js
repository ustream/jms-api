'use strict';

/**
 * Operations on /module/{source}/{stage}
 */
module.exports = {

	/**
	 * Get module names from the given source and stage

	 * parameters: source, stage
	 * produces:
	 */
	get: function (req, reply) {

		var params = req.params;

		req.server.methods.storage(
			'getAllVersions',
			params.source,
			params.stage,
			function (err, result) {
				if (err) return reply('Internal error').code(500);


				if (!result) {
					return reply('Not found').code(404);
				}

				reply(Object.keys(result));
			}
		);
	}

};

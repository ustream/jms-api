'use strict';

/**
 * Operations on /module/{source}/{stage}/versions
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
				reply(result);
			}
		);
	}

};
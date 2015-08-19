'use strict';

/**
 * Operations on /module/versions/{stage}
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
			'getSourcesFromStage',
			params.stage,
			function (err, result) {
				reply(result);
			}
		);
	}

};

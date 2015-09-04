'use strict';

var _ = require('lodash');
var async = require('async');


function getVersions (req, item, callback) {
	var arg =  item.split(':')

	req.server.methods.storage(
			'getAllVersions',
			arg[1],
			arg[2],
			function (err, result) {
				if (err) return callback(err);

				callback(null, {
					source: arg[1],
					versions: result
				})
			}
	);

}

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

		var iterator = _.curry(getVersions)(req);

		req.server.methods.storage(
				'getSourceKeysByStage',
				params.stage,
				function (err, result) {
					if (err) return reply('Internal error').code(500);

					if (!result[0]) {
						return reply('Not found').code(404);
					}

					async.map(result, iterator, function (err, result) {
						if (err) return reply('Internal error').code(500);
						reply(result);
					})
				}
		)
	}

};

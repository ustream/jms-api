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
			callback(err, {
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
				async.map(result, iterator, function (err, result) {
					reply(result);
				})
			}
		)
	}

};

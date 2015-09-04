'use strict';

var _ = require('lodash');

/**
 * Operations on /module/{source}/{stage}/hash
 */
module.exports = {

    /**
     * Returns information of a module, that is handled by JMS

     * parameters: source, stage, hash
     * produces:
     */
    get: function (req, reply) {

        var params = req.params;
        var query = req.query;

        req.server.methods.storage(
            'getModules',
            [params.module],
            function (err, result) {
                if (err) return reply('Internal error').code(500);

                if (!result[0]) {
                    return reply('Not found').code(404);
                }

                reply(result.map(JSON.parse));
            }
        );

    }

};

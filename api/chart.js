(() => {
    'use strict';

    const assert = require('assert');
    const request = require('../request.js');

    const methods = [{
        'name'    : 'getTopArtists',
        'required': [],
        'optional': ['page', 'limit']
    }, {
        'name'    : 'getTopTags',
        'required': [],
        'optional': ['page', 'limit']
    }, {
        'name'    : 'getTopTracks',
        'required': [],
        'optional': ['page', 'limit']
    }];

    // init sub module
    methods.forEach(function (methodItem) {
        exports[methodItem.name] = function (params = {}) {
            const required = methodItem.required;
            for (const requiredKey of required) {
                assert.ok(params[requiredKey], `required "${requiredKey}" not available`);
            }

            return request(Object.assign({}, {
                method : `chart.${methodItem.name.toLowerCase()}`,
                api_key: this.apiKey,
                format : 'json'
            }, params));
        };
    });
})();

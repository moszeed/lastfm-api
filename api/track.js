(() => {
    'use strict';

    const assert = require('assert');
    const request = require('../request.js');

    const methods = [{
        'name'    : 'getCorrection',
        'required': ['artist', 'track'],
        'optional': []
    }, {
        'name'    : 'getInfo',
        'required': ['artist', 'track'],
        'optional': ['mbid', 'username', 'autocorrect']
    }, {
        'name'    : 'getSimilar',
        'required': ['artist', 'track'],
        'optional': ['mbid', 'autocorrect', 'limit']
    }, {
        'name'    : 'getTags',
        'required': ['artist', 'track'],
        'optional': ['mbid', 'autocorrect', 'user']
    }, {
        'name'    : 'getTopTags',
        'required': ['artist', 'track'],
        'optional': ['mbid', 'autocorrect']
    }, {
        'name'    : 'search',
        'required': ['artist'],
        'optional': ['limit', 'page']
    }];

    // init sub module
    methods.forEach(function (methodItem) {
        exports[methodItem.name] = function (params = {}) {
            const required = methodItem.required;
            for (const requiredKey of required) {
                assert.ok(params[requiredKey], `required "${requiredKey}" not available`);
            }

            return request(Object.assign({}, {
                method : `track.${methodItem.name.toLowerCase()}`,
                api_key: this.apiKey,
                format : 'json'
            }, params));
        };
    });
})();

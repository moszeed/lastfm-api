(() => {
    'use strict';

    const assert = require('assert');
    const request = require('../request.js');

    const methods = [{
        'name'    : 'getCorrection',
        'required': ['artist'],
        'optional': []
    }, {
        'name'    : 'getInfo',
        'required': ['artist'],
        'optional': ['mbid', 'lang', 'autocorrect', 'username']
    }, {
        'name'    : 'getSimilar',
        'required': ['artist'],
        'optional': ['limit', 'autocorrect', 'mbid']
    }, {
        'name'    : 'getTags',
        'required': ['artist'],
        'optional': ['mbid', 'user', 'autocorrect']
    }, {
        'name'    : 'getTopAlbums',
        'required': ['artist'],
        'optional': ['mbid', 'autocorrect', 'page', 'limit']
    }, {
        'name'    : 'getTopTags',
        'required': ['artist'],
        'optional': ['mbid', 'autocorrect']
    }, {
        'name'    : 'getTopTracks',
        'required': ['artist'],
        'optional': ['mbid', 'autocorrect', 'page', 'limit']
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
                method : `artist.${methodItem.name.toLowerCase()}`,
                api_key: this.apiKey,
                format : 'json'
            }, params));
        };
    });
})();

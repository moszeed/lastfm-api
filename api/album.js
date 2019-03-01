(() => {
    'use strict';

    const assert = require('assert');
    const request = require('../request.js');

    const methods = [{
        'name'    : 'getInfo',
        'required': ['artist', 'album'],
        'optional': ['mbid', 'autocorrect', 'username', 'lang']
    }, {
        'name'    : 'getTags',
        'required': ['artist', 'album'],
        'optional': ['mbid', 'autocorrect', 'user']
    }, {
        'name'    : 'getTopTags',
        'required': ['artist', 'album'],
        'optional': ['mbid ', 'autocorrect']
    }, {
        'name'    : 'search',
        'required': ['album'],
        'optional': ['limit', 'page', 'autocorrect']
    }];

    // init sub module
    methods.forEach(function (methodItem) {
        exports[methodItem.name] = function (params = {}) {
            const required = methodItem.required;
            for (const requiredKey of required) {
                assert.ok(params[requiredKey], `required "${requiredKey}" not available`);
            }

            return request(Object.assign({}, {
                method : `album.${methodItem.name.toLowerCase()}`,
                api_key: this.apiKey,
                format : 'json'
            }, params));
        };
    });
})();

(() => {
    'use strict';

    const assert = require('assert');
    const request = require('../request.js');

    const methods = [{
        'name'    : 'getInfo',
        'required': ['tag'],
        'optional': ['lang']
    }, {
        'name'    : 'getSimilar',
        'required': ['tag'],
        'optional': []
    }, {
        'name'    : 'getTopAlbums',
        'required': ['tag'],
        'optional': ['limit', 'page']
    }, {
        'name'    : 'getTopArtists',
        'required': ['tag'],
        'optional': ['limit', 'page']
    }, {
        'name'    : 'getTopTags',
        'required': [],
        'optional': []
    }, {
        'name'    : 'getTopTracks',
        'required': ['tag'],
        'optional': ['limit', 'page']
    }, {
        'name'    : 'getWeeklyChartList',
        'required': ['tag'],
        'optional': []
    }];

    // init sub module
    methods.forEach(function (methodItem) {
        exports[methodItem.name] = function (params = {}) {
            const required = methodItem.required;
            for (const requiredKey of required) {
                assert.ok(params[requiredKey], `required "${requiredKey}" not available`);
            }

            return request(Object.assign({}, {
                method : `tag.${methodItem.name.toLowerCase()}`,
                api_key: this.apiKey,
                format : 'json'
            }, params));
        };
    });
})();

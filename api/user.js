(() => {
    'use strict';

    const assert = require('assert');
    const request = require('../request.js');

    const methods = [{
        'name'    : 'getArtistTracks',
        'required': ['user', 'artist'],
        'optional': ['startTimestamp', 'page', 'endTimestamp']
    }, {
        'name'    : 'getFriends',
        'required': ['user'],
        'optional': ['recenttracks', 'limit', 'page']
    }, {
        'name'    : 'getInfo',
        'required': ['user'],
        'optional': []
    }, {
        'name'    : 'getLovedTracks',
        'required': ['user'],
        'optional': ['limit', 'page']
    }, {
        'name'    : 'getPersonalTags',
        'required': ['user', 'tag', 'taggingtype'],
        'optional': ['limit', 'page']
    }, {
        'name'    : 'getRecentTracks',
        'required': ['user'],
        'optional': ['limit', 'page', 'from', 'extended', 'to']
    }, {
        'name'    : 'getTopAlbums',
        'required': ['user'],
        'optional': ['period', 'limit', 'page']
    }, {
        'name'    : 'getTopArtists',
        'required': ['user'],
        'optional': ['period', 'limit', 'page']
    }, {
        'name'    : 'getTopTags',
        'required': ['user'],
        'optional': ['limit']
    }, {
        'name'    : 'getTopTracks',
        'required': ['user'],
        'optional': ['period', 'limit', 'page']
    }, {
        'name'    : 'getWeeklyAlbumChart',
        'required': ['user'],
        'optional': ['from', 'to']
    }, {
        'name'    : 'getWeeklyArtistChart',
        'required': ['user'],
        'optional': ['from', 'to']
    }, {
        'name'    : 'getWeeklyChartList',
        'required': ['user'],
        'optional': []
    }, {
        'name'    : 'getWeeklyTrackChart',
        'required': ['user'],
        'optional': ['from', 'to']
    }];

    // init sub module
    methods.forEach(function (methodItem) {
        exports[methodItem.name] = function (params = {}) {
            const required = methodItem.required;
            for (const requiredKey of required) {
                assert.ok(params[requiredKey], `required "${requiredKey}" not available`);
            }

            return request(Object.assign({}, {
                method : `user.${methodItem.name.toLowerCase()}`,
                api_key: this.apiKey,
                format : 'json'
            }, params));
        };
    });
})();

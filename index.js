(() => {
    'use strict';

    const assert = require('assert');

    const Auth = require('./api/auth.js');
    const User = require('./api/user.js');
    const Artist = require('./api/artist.js');
    const Album = require('./api/album.js');
    const Chart = require('./api/chart.js');
    const Geo = require('./api/geo.js');
    const Libary = require('./api/libary.js');
    const Tag = require('./api/tag.js');
    const Track = require('./api/track.js');

    module.exports = LastFm;

    function initalizeSubModule (subModule, bindTarget) {
        return Object.getOwnPropertyNames(subModule).reduce((store, funcName) => {
            store[funcName] = subModule[funcName].bind(bindTarget);
            return store;
        }, {});
    }

    function LastFm (params = {}) {
        if (!(this instanceof LastFm)) return new LastFm(params);
        assert.ok(params.apiKey, 'no apiKey given');

        // save api params
        this.apiParams = {
            'apiKey'   : params.apiKey,
            'apiSecret': params.apiSecret
        };

        // load sub modules
        this.auth = initalizeSubModule(Auth, this.apiParams);
        this.user = initalizeSubModule(User, this.apiParams);
        this.artist = initalizeSubModule(Artist, this.apiParams);
        this.album = initalizeSubModule(Album, this.apiParams);
        this.chart = initalizeSubModule(Chart, this.apiParams);
        this.geo = initalizeSubModule(Geo, this.apiParams);
        this.libary = initalizeSubModule(Libary, this.apiParams);
        this.tag = initalizeSubModule(Tag, this.apiParams);
        this.track = initalizeSubModule(Track, this.apiParams);
    }
})();

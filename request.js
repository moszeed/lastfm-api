(() => {
    'use strict';

    const querystring = require('querystring');
    const assert = require('assert');
    const fetch = require('node-fetch');

    const apiRootUrl = 'https://ws.audioscrobbler.com/2.0/';

    module.exports = (params = {}, opts = {}) => {
        assert.ok(params.method, 'no method given');
        assert.ok(params.api_key, 'no api_key given');

        const apiUrl = new URL(apiRootUrl);

        // add params to url
        apiUrl.search = querystring.stringify(params);

        const fetchPromise = fetch(apiUrl);

        if (!params.format ||
            params.format === 'xml') {
            return fetchPromise.then(res => res.text());
        }

        return fetchPromise.then(res => res.json());
    };
})();

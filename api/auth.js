(() => {
    'use strict';

    const assert = require('assert');
    const crypto = require('crypto');
    const querystring = require('querystring');
    const request = require('../request.js');

    const apiRootAuthUrl = 'https://www.last.fm/api/auth/';

    function md5 (inputString = '') {
        return crypto.createHash('md5').update(inputString).digest('hex');
    }

    function createApiSign (params = {}, secret) {
        assert.ok(secret, 'no secret available');

        const paramKeys = Object.keys(params).sort();
        const filteredParamKeys = paramKeys
            .filter((key) => key !== 'api_sig' && key !== 'format');

        const paramsAsString = filteredParamKeys.map((key) => `${key}${params[key]}`).join('');

        return md5(`${paramsAsString}${secret}`);
    };

    exports.getLoginUrl = function (params = {}) {
        const apiUrl = new URL(apiRootAuthUrl);
        params.api_key = this.apiKey;

        // add params to url
        apiUrl.search = querystring.stringify(params);

        return apiUrl;
    };

    exports.getToken = function (params = {}) {
        // create base params
        const baseParams = Object.assign({}, {
            method : 'auth.gettoken',
            api_key: this.apiKey,
            format : 'json'
        }, params);

        // append signature
        baseParams.api_sig = createApiSign(baseParams, this.apiSecret);

        return request(baseParams);
    };

    exports.getSession = function (params = {}) {
        assert.ok(params.token, 'no token given');

        // create base params
        const baseParams = Object.assign({}, {
            method : 'auth.getsession',
            api_key: this.apiKey,
            format : 'json'
        }, params);

        // append signature
        baseParams.api_sig = createApiSign(baseParams, this.apiSecret);

        return request(baseParams);
    };
})();

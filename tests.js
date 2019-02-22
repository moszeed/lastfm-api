(() => {
    'use strict';

    const test = require('tape');
    const LastFmClient = require('.');

    let lastFm = null;

    const apiKey = 'b49f3c3f05384fe87e55482d5796cc7b';
    const apiSecret = 'b11fe7452829588f5cf71f625ff7a278';

    test('create new instance of lastFmClient', (t) => {
        lastFm = new LastFmClient({
            apiKey   : apiKey,
            apiSecret: apiSecret
        });
        t.end();
    });

    test('getLoginUrl', (t) => {
        const loginUrl = lastFm.auth.getLoginUrl();
        t.equal(loginUrl.href, `https://www.last.fm/api/auth/?api_key=${apiKey}`, 'got expected login url');
        t.end();
    });

    test('getLoginUrl - with callback url', (t) => {
        const loginUrl = lastFm.auth.getLoginUrl({
            cb: 'https:\\www.google.de'
        });

        t.ok(loginUrl.href.includes('cb=https%3A%5Cwww.google.de'), 'got expected login url');
        t.end();
    });

    test('getSession - wrong token', (t) => {
        lastFm.auth.getSession({
            token: 'TOKEN'
        }).then((response) => {
            t.ok(response.error, 4, 'got Unauthorized Token error');
            t.end();
        }).catch((err) => t.end(err));
    });

    test('user.getToken', (t) => {
        lastFm.auth.getToken().then((response) => {
            t.ok(response.token, 'got a token');

            // and now try to get a real session to work with
            t.test('getSession - with token', (st) => {
                lastFm.auth.getSession({
                    token: response.token
                }).then((response) => {
                    console.log(response);
                    st.end();
                }).catch((err) => st.end(err));
            });

            // now try to get a login url with these token
            t.test('getLoginUrl - with token', (st) => {
                const loginUrl = lastFm.auth.getLoginUrl({
                    token: response.token
                });

                st.ok(loginUrl.href.includes(`token=${response.token}`), 'got expected login url');
                st.comment('login url is: ' + loginUrl.href);
                st.end();
            });

            t.end();
        }).catch((err) => t.end(err));
    });

    test('user.getTopAlbums - no "user" error', (t) => {
        try {
            lastFm.user.getTopAlbums();
            t.end('has to error');
        } catch (err) {
            t.equal(err.message, 'required "user" not available');
            t.end();
        }
    });

    test('user.getTopAlbums', (t) => {
        try {
            lastFm.user.getTopAlbums({ user: 'moszeeed' })
                .then((response) => {
                    t.ok(response.topalbums, 'got "topalbums');
                    t.end();
                })
                .catch(t.end);
        } catch (err) {
            t.end(err);
        }
    });

    test('user.getTopArtists', (t) => {
        try {
            lastFm.user.getTopArtists({ user: 'moszeeed' })
                .then((response) => {
                    t.ok(response.topartists, 'got "topartists');
                    t.end();
                })
                .catch(t.end);
        } catch (err) {
            t.end(err);
        }
    });

    test('artist.getInfo', (t) => {
        try {
            lastFm.artist.getInfo({ artist: 'Queens of the Stone Age' })
                .then((response) => {
                    t.ok(response.artist, 'got artist');
                    t.ok(response.artist.name, 'Queens of the Stone Age', 'got correct artist');
                    t.end();
                })
                .catch(t.end);
        } catch (err) {
            t.end(err);
        }
    });
})();

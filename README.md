# lastfm-api-client
a Last.FM API Client for Node and the Browser

##### Support

[Buy me a Coffee](https://www.patreon.com/moszeed)

### Features
* support for all available **GET** methods
* promises
* works in **node** and **browser**


### How to install
```shell
npm install lastfm-api-client
```

### API usage

```javascript
const LastFmApi = require('lastfm-api-client');
const LastFmClient = new LastFmApi({
    apiKey   : '<-- your last.fm api key -->',
    apiSecret: '<-- your last.fm api secret -->'
});

LastFmClient.track.getInfo({
    artist: 'Queens of the Stone Age',
    track : 'No One Knows'
}).then((response) => {
    console.log(response);
})
```


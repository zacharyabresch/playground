const { default: fetch, Response, Request, Headers } = require.requireActual(
  'node-fetch'
);

global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;

const mock = (url, options) => global.fetch(url.toString(), options);

module.exports = mock;

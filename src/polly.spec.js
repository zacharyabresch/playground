import fetch from 'node-fetch';
import { Polly } from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';
import FSPersister from '@pollyjs/persister-fs';

/*
  Register the adapters and persisters we want to use. This way all future
  polly instances can access them by name.
*/
Polly.register(FetchAdapter);
Polly.register(FSPersister);

import posts from './polly';

describe('Posts', () => {
  it('should get an array of posts', async () => {
    const polly = new Polly('Get `Posts`', {
      adapters: ['fetch'],
      persister: 'fs'
    });
    const { server } = polly;

    const stuff = await posts();
    expect(Array.isArray(stuff)).toBe(true);
    await polly.stop();
  });

  it('should get one post', async () => {
    const polly = new Polly('Get a `Post`', {
      adapters: ['fetch'],
      persister: 'fs'
    });
    const { server } = polly;
    const expected = ['userId', 'id', 'title', 'body'];
    const stuff = await posts(1);
    expect(Object.keys(stuff)).toEqual(expected);
    await polly.stop();
  });
});

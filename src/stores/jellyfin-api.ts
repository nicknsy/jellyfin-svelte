import { Jellyfin } from '@jellyfin/sdk';

const version = '0.0.1';

const JellfyinBase = new Jellyfin({
    clientInfo: {
        name: 'Jellyfin Svelte',
        version: version
    },
    deviceInfo: {
        name: 'Test Device',
        id: 'test-id'
    }
});

export const JellyfinApi = JellfyinBase.createApi('http://jellyfin.local:8096/');

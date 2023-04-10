import { Jellyfin } from '@jellyfin/sdk';

const version = '0.0.1';

const JellfyinSDK = new Jellyfin({
    clientInfo: {
        name: 'Jellyfin Svelte',
        version: version
    },
    deviceInfo: {
        name: 'Test Device',
        id: 'test-id'
    }
});

export const JellyfinAPI = JellfyinSDK.createApi('http://localhost:8096/');

import { browser } from '$app/environment';
import { JellyfinAPI } from './jellyfin-api';
import type { Api } from '@jellyfin/sdk'
import type { AuthenticationResult } from '@jellyfin/sdk/lib/generated-client';

export class Session {
    private JellyfinApi: Api;
    private Auth?: AuthenticationResult;

    constructor(JellyfinApi: Api, Auth?: AuthenticationResult) {
        this.JellyfinApi = JellyfinApi;
        this.Auth = Auth;

        if (!this.Auth && browser) {
            const localAuth = window.localStorage.getItem('jellyfin-auth');
            if (localAuth) {
                this.Auth = JSON.parse(localAuth);
                if (this.Auth?.AccessToken) this.JellyfinApi.accessToken = this.Auth.AccessToken; 
            }
        }
    }
    
    public getJellyfinApi(): Api {
        return this.JellyfinApi;
    }

    public getAuth(): AuthenticationResult | undefined {
        return this.Auth;
    }

    public updateAuth(newAuth: AuthenticationResult) {
        this.Auth = newAuth;
        window.localStorage.setItem('jellyfin-auth', JSON.stringify(newAuth));
    }
}

export const CurrentSession = new Session(JellyfinAPI);
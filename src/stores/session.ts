import { browser } from '$app/environment';
import * as JellyfinSdk from '@jellyfin/sdk/lib/utils/api';
import { JellyfinApi } from './jellyfin-api';
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
    
    public getJellyfinApi() {
        return this.JellyfinApi;
    }

    /*
     * Authentication & Local Storage
     */
    public getAuth(): AuthenticationResult | undefined {
        return this.Auth;
    }

    public updateAuth(newAuth: AuthenticationResult) {
        this.Auth = newAuth;
        window.localStorage.setItem('jellyfin-auth', JSON.stringify(newAuth));
    }

    public clearAuth() {
        this.Auth = undefined;
        window.localStorage.removeItem('jellyfin-auth');
    }

    /*
     * Utility Methods
     */
    public getProfileImageUrl(quality = 90) {
        if (!this.Auth?.User?.Id) return undefined;

        const user = this.Auth.User.Id;
        const tag = this.Auth.User.PrimaryImageTag ?? '';
        
        return `${this.JellyfinApi.basePath}/Users/${user}/Images/Primary?quality=${quality}&tag=${tag}`;
    }

    /*
     * SDK Wrapper Methods
     */
    public getItemsApi() {
        return JellyfinSdk.getItemsApi(this.JellyfinApi);
    }

    public getUserViewsApi() {
        return JellyfinSdk.getUserViewsApi(this.JellyfinApi);
    }

    public getImageApi() {
        return JellyfinSdk.getImageApi(this.JellyfinApi);
    }

    public getTvShowsApi() {
        return JellyfinSdk.getTvShowsApi(this.JellyfinApi);
    }
}

export const CurrentSession = new Session(JellyfinApi);
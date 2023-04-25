import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: true
	},
	ssr: {
		noExternal: ['@jellyfin/sdk']	// https://vite-plugin-ssr.com/common-issues#npm-packages-containing-invalid-code
	}
});

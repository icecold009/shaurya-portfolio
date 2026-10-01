import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import { handleProjectPickerRequest } from './api/project-picker.js';

function projectFinderApi(apiKey) {
    return {
        name: 'project-finder-api',
        configureServer(server) {
            server.middlewares.use('/api/project-picker', (request, response) => {
                void handleProjectPickerRequest(request, response, { apiKey });
            });
        },
    };
}

export default defineConfig(({ mode }) => {
    const environment = loadEnv(mode, process.cwd(), '');
    const apiKey = environment.TYPESAFE_API_KEY || process.env.TYPESAFE_API_KEY;

    return {
        plugins: [
            { enforce: 'pre', ...mdx() },
            react(),
            projectFinderApi(apiKey),
        ],
        server: {
            port: 5174,
            strictPort: true,
        },
        preview: {
            port: 5174,
            strictPort: true,
        },
    };
});

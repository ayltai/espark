/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react-swc';
import { resolve, } from 'path';
import { defineConfig, } from 'vite';

export default defineConfig({
    plugins : [
        react(),
    ],
    test    : {
        globals     : true,
        environment : 'jsdom',
        coverage    : {
            enabled    : true,
            provider   : 'v8',
            reporter   : [
                'json',
                'text',
            ],
            include    : [
                'src/**/*.{ts,tsx}',
            ],
            exclude    : [
                'src/**/vite-env.d.ts',
                'src/**/*.types.ts',
                'src/components/**/index.tsx',
                'src/routes/**/index.tsx',
                'src/models/**/*.ts',
                'src/setupTests.ts',
                'src/utils/test.tsx',
                'vite.config.ts',
                '.eslint.config.js',
            ],
            thresholds : {
                statements : 45,
            },
        },
        include     : [
            'src/**/*.test.{ts,tsx}',
        ],
        reporters   : [
            'default',
            'html',
        ],
        setupFiles  : [
            'src/setupTests.ts',
        ],
    },
    build   : {
        sourcemap     : true,
        lib           : {
            entry    : resolve(__dirname, 'src/index.tsx'),
            formats  : [
                'cjs',
                'es',
            ],
            name     : 'Espark-React',
            fileName : format => `index.${format}.js`,
        },
        rollupOptions : {
            external : [
                'react',
                'react/jsx-runtime',
                'react-dom',
                'react-router-dom',
            ],
            output   : {
                globals : {
                    react       : 'React',
                    'react-dom' : 'ReactDOM',
                },
            },
        },
    },
});

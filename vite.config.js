import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

import { peerDependencies as externals, name } from './package.json';

module.exports = defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.tsx'),
      name,
      fileName: (format) => (format === 'cjs' ? 'index.js' : `index.${format}.js`),
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: Object.keys(externals),
      output: {
        globals: {
          react: 'React',
          reactDom: 'reactDom',
        },
      },
    },
  },
});

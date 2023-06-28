import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PrettierPluginMerge',
      fileName: 'prettier-plugin-merge',
    },
    rollupOptions: {
      external: [/^prettier/],
      output: {
        globals: {
          prettier: 'prettier',
        },
      },
    },
  },
  plugins: [
    dts({
      include: ['src/**'],
    }),
  ],
});

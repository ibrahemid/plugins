import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ibrahemid.github.io',
  base: '/plugins',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory'
  }
});

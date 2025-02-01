// rollup.config.js

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy';


import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'

export default {
  input: 'src/manifest.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension(),
    simpleReloader(),
    // the plugins below are optional
    typescript(),
    resolve(),
    commonjs(),
    copy({
      targets: [
        { src: ['src/background/document.html', 'src/background/katex.css', 'src/background/katex.js'], dest: 'dist/background' },
        { src: ['assets/fonts/arial.woff', 'assets/fonts/arial.woff2'], dest: 'dist/public/fonts' },
        { src: 'assets/images/**/*', dest: 'dist/public/images' }
      ]
    })
  ],
}
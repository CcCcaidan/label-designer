import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: [
    'vue',
    '@angular/core',
    '@angular/common',
    '@angular/elements',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/cdk',
    'label-designer',
    'angularx-qrcode',
    'jszip',
    'file-saver',
    'ngx-webstorage',
    'xlsx',
    'ngx-bootstrap'
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src'
    })
  ]
}
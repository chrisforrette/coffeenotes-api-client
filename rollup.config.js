import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

const config = {
  input: 'index.js',
  external: Object.keys(pkg.dependencies),
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    json(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      include: ['node_modules/**']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify())
}

export default config

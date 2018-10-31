import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import ignore from 'rollup-plugin-ignore'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import uglifyEs from 'rollup-plugin-uglify-es'
import pkg from './package.json'

const isProd = process.env.NODE_ENV === 'production'

const plugins = [
  json(),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true
  }),
  resolve(),
  commonjs({ include: ['node_modules/**'] }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

const config = [
  // Node
  {
    input: 'index.js',
    external: [
      'querystring',
      ...Object.keys(pkg.dependencies)
    ],
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    plugins: plugins.concat(isProd ? [uglify()] : [])
  },
  // Browser
  {
    input: 'index.js',
    output: {
      file: pkg.module,
      format: 'es'
    },
    plugins: [
      ignore(['fetch-everywhere']),
      ...plugins
    ].concat(isProd ? [uglifyEs()] : [])
  }
]

export default config

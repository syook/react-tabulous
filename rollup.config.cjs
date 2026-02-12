const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const image = require('@rollup/plugin-image');
const reactSvg = require('rollup-plugin-react-svg');
const terser = require('@rollup/plugin-terser');
const dts = require('rollup-plugin-dts');

// Use require to load package.json
const packageJson = require('./package.json');

const rollupConfig = [
  {
    input: 'src/reactTabulous/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: false
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss(),
      image(),
      reactSvg({
        // svgo options
        svgo: {
          plugins: [], // passed to svgo
          multipass: true
        },

        // whether to output jsx
        jsx: false,

        // include: string
        include: null,

        // exclude: string
        exclude: null
      }),
      terser()
    ],
    external: ['react', 'react-dom']
  },
  {
    input: 'src/reactTabulous/index.ts',
    output: [{ file: 'lib/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.(css|less|scss)$/]
  }
];

module.exports = rollupConfig;

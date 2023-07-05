import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import reactSvg from 'rollup-plugin-react-svg';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

import packageJson from './package.json' assert { type: 'json' };

const rollupConfig = [
	{
		input: 'src/data-grid/index.ts',
		output: [
			{
				file: packageJson.main,
				format: 'cjs',
				sourcemap: true
			},
			{
				file: packageJson.module,
				format: 'esm',
				sourcemap: true
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
	}
	// {
	// 	input: 'lib/types/entry.d.ts',
	// 	output: [{ file: 'lib/index.d.ts', format: 'esm' }],
	// 	plugins: [dts()],
	// 	external: [/\.(css|less|scss)$/]
	// }
];

export default rollupConfig;

module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'react-app',
		'react-app/jest',
		'plugin:react/recommended',
		'standard-with-typescript',
		'plugin:react-hooks/recommended',
		'prettier'
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json']
	},
	plugins: ['react'],
	rules: {
		semi: [2, 'always'],
		'no-debugger': 'off',
		'react/react-in-jsx-scope': 'off',
		'no-use-before-define': 'off',
		'react/prop-types': 'off',
		'react/display-name': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off'
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};

module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
	],
	parser: '@typescript-eslint/parser',
	env: {
		browser: true,
		es6: true,
		jest: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			arrowFunctions: true,
		},
	},
	plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				paths: ['./src'],
			},
		},
	},
	rules: {
		'comma-dangle': 'off',
		'function-paren-newline': 'off',
		'global-require': 'off',
		'import/no-dynamic-require': 'off',
		'no-inner-declarations': 'off',
		'class-methods-use-this': 'off',
		'import/extensions': 'off',
		'import/prefer-default-export': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
		'@typescript-eslint/no-explicit-any': 'off',
		'react/prop-types': ['off'],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'off',

	},
};

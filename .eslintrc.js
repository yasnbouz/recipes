// eslint-disable-next-line
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',

        // Prettier plugin and recommended rules
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    rules: {
        // Include .prettierrc.js rules
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
};

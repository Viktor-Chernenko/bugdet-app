module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        semi: 'off',
        'no-plusplus': 'off',
        'eol-last': 'off',
        'no-tabs': 'off',
        indent: ['error', 4],
        'no-alert': 'off',
        'prefer-destructuring': 'off',
        'no-param-reassign': 'off',
        'max-len': ['warn', 350, { ignoreUrls: true }],
        'linebreak-style': 0,
        'no-unused-vars': 'warn',
        'comma-dangle': 'off',
        'arrow-parens': 'off',
        quotes: 'off'
    },
};

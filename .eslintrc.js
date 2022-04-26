module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        babelOptions: {
            configFile: './babel.config.json',
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ['eslint:recommended', 'google'],
    rules: {
        'no-trailing-spaces': 'off',
        'no-unused-vars':'off',
        'no-debugger':'off',
        'semi': 'off',
        'require-jsdoc': 'off',
        'linebreak-style':'off',
        'eol-last':'off',
        'space-before-blocks':'off',
        'quotes':'off',
        'indent':'off',
        'space-before-function-paren':'off',
        'comma-dangle':'off',
        'comma-spacing':'off',
        'arrow-parens':'off',
        'no-multi-spaces':'off',
        'func-call-spacing':'off',
        'operator-linebreak':'off'
    }
}

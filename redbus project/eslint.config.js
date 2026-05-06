module.exports = [
    {
        languageOptions: {
            globals: {
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly',
                console: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'error',
            'no-console': 'off',
            'eqeqeq': 'error',
            'curly': 'error',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single']
        }
    }
];
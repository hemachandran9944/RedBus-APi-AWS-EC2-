module.exports = [
    {
        languageOptions: {
            globals: {
                require: "readonly",
                module: "readonly",
                exports: "readonly",
                console: "readonly",
                process: "readonly",
                __dirname: "readonly",
                __filename: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error"
        }
    }
];
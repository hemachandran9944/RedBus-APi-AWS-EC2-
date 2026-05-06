const eslint = require("@eslint/js");

module.exports = [
    eslint.configs.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error"
        }
    }
];
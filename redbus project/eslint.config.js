const eslint = require("@eslint/js");


try {
    module.exports = [
    eslint.configs.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error"
        }
    }
];
    
} catch (error) {
    console.log("eslint".error);
    throw error;
    
}

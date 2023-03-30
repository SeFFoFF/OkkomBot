module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "linebreak-style": 0,
        "arrow-body-style": "off",
        "no-duplicate-imports": "error",
        "semi": ["error", "never"],
        "import/prefer-default-export": "off",
        "indent": ["error", 4],
        "import/extensions": "off",
        "import/no-extraneous-dependencies": "off",
        "no-undef": "warn",
        "quotes": "error",
        "no-multi-assign": "off",
        "func-names": "off"
    }
}

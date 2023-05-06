module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "airbnb-typescript",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "no-restricted-syntax": "off",
        "no-use-before-define": "off",
        "react/no-array-index-key": "off",
        "react/require-default-props": "off",
        'react/jsx-props-no-spreading': "off",
        "import/prefer-default-export": "off",
        'import/extensions': ['error', 'never', {
            "css": "always"
        }],
        'jsx-a11y/label-has-associated-control': "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "@typescript-eslint/no-use-before-define": "off",
    }
}

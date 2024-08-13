// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ["**/node_modules/", ".env", "**/dist/"],
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "@typescript-eslint/no-var-requires": 0,
            "no-console": "error"
        },
    }
);
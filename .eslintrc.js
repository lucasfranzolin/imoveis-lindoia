module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['standard', 'prettier', 'plugin:import/recommended'],
    plugins: ['simple-import-sort', 'import', '@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: ['./tsconfig.json'],
            },
        },
    },
    rules: {
        indent: ['error', 4],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        'import/default': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'off',
        'prefer-const': 'off',
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error',
        'space-before-function-paren': 'off',
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-useless-constructor': 'off',
    },
    overrides: [
        {
            env: {
                jest: true,
            },
            files: ['**/?(*.)+spec.ts'],
            extends: ['plugin:jest/recommended'],
        },
    ],
};

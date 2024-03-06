// @ts-check
// This is an eslint configuration file for TypeScript projects.
// Add the nedded configuration in order to allow the usage of "any" type.
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);

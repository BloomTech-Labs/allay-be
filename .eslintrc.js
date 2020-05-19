module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  overrides: [
    {
      files: ['**/*.spec.js'],
      env: {
        jest: true,
      },
    },
  ],
};

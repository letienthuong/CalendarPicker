module.exports = {
  rules: {
    quotes: [2, 'single'],
    semi: [2, 'always'],
    'react/prop-types': [0],
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {},
  plugins: ['react'],
};

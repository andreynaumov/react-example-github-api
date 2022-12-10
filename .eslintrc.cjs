module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-var': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

    // allow jsx syntax in js files (for next.js project)
    // 'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}], //should add ".ts" if typescript project
  },
};

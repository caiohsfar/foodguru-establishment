module.exports = {
  extends: ['prettier', 'airbnb'],
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  rules: {
    'no-console': 'off',
    'react/destructuring-assignment': 'off',
    'import/no-useless-path-segments': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'react/prefer-stateless-function': ['off', { ignorePureComponents: true }]
  },
  globals: {
    fetch: false
  }
};

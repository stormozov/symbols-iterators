module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'overrides': [
    {
      'files': ['**/*/*.test.js'],
      'plugins': ['jest'],
      'extends': ['plugin:jest/recommended'],
      'rules': { 'jest/prefer-expect-assertions': 'off' }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'no-var': 'error',
    'prefer-const': 'error',
    'no-dupe-keys': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-case': 'error',
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'no-multiple-empty-lines': [
      'error',
      { 'max': 1, 'maxEOF': 1 }
    ],
    'max-len': [
      'error',
      { 'code': 120 }
    ],
    'eol-last': [
      'error',
      'always'
    ]
  }
}

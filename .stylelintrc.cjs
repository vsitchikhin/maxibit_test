module.exports = {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['dist/**/*', 'node_modules/**/*'],
  overrides: [
    {
      files: ['**/*.{scss,css}'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'block-no-empty': true,
    'color-hex-length': 'short',
  },
}

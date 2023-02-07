module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'prettier'],
  settings: {
    next: {
      rootDir: ['./*'],
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
}

module.exports = {
  '*.{ts,js}': ['oxlint --fix', 'oxfmt --write'],
  '*.{json,md,mdx,html,css,scss}': 'oxfmt --write',
};

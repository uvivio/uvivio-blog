module.exports = {
  '*.{ts,tsx}': [
    'eslint --cache --fix',
    'sh -c "yarn format:fix || bun run format:fix || npm run format:fix"',
    'sh -c "yarn lint || bun run lint || npm run lint"',
    () => 'sh -c "yarn build || bun run build || npm run build"',
  ],
};

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'scope-case': [0],
    'scope-enum': [0],
    'body-max-line-length': [2, 'always', 400],
    'function-rules/scope-enum': [
      2,
      'always',
      (parsed) => {
        if (
          parsed.scope === 'release' ||
          parsed.scope === 'commitlint' ||
          parsed.scope === 'util' ||
          parsed.scope === 'hot-fix' ||
          parsed.scope === 'pipeline'
        )
          return [true];
        const ticketPattern = /^TICKET-[a-zA-Z0-9]+$/;
        return parsed.scope && ticketPattern.test(parsed.scope)
          ? [true]
          : [
              false,
              'Please include a valid Task/Story ID in the scope e.g feat(TICKET-86c1jtaen): sample commit',
            ];
      },
    ],
    'scope-empty': [2, 'never'], // Enforce that a scope is always provided
  },
};

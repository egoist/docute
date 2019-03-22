module.exports = {
  branch: 'master',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [{type: 'feat', scope: 'ui', release: 'patch'}]
      }
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github'
  ]
}

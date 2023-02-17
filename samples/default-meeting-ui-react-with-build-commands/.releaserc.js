const baseConfig = {
  branches: [],
  extends: 'semantic-release-monorepo',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        tarballDir: 'dist',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}\n\n\nskip-checks: true',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: 'dist/*.tgz',
      },
    ],
  ],
  repositoryUrl: 'https://github.com/dyte-in/electron-sample-app',
}
const mainConfig = {
  ...baseConfig,
  branches: ['main'],
}
const stagingConfig = {
  ...baseConfig,
  branches: ['main', { name: 'staging', prerelease: true }],
}
module.exports = process.env.ENVIRONMENT.includes('staging') ? stagingConfig : mainConfig

module.exports = {
  apps: [{
    name: 'open_ai',
    script: 'npm run start',
    env_production: {
      NODE_ENV: 'production',
    },
    env_development: {
      NODE_ENV: 'development',
    },
  }],
}

module.exports = {
  apps: [
    {
      name: 'express-node-template',
      script: 'xvfb-run --server-args="-screen 0 1024x768x24" npm run prod',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      env_test: {
        NODE_ENV: 'test',
      },
    },
  ],
}

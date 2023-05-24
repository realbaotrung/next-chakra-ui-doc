// -------------- PM2 -----------------
// Start dev:
// - pm2 start ecosystem.config.js
// Deployment:
// -> research
// kill all:
// - pm2 kill

module.exports = {
    apps: [
        {
            name: 'chakra-ui',
            script: 'pnpm start',
            watch: '.',
            cwd: __dirname,
            autostart: true,
            env: {
                NODE_ENV: 'production'
            }
        }
    ],

    // deploy: {
    //     production: {
    //         user: 'deploy',
    //         host: '10.0.0.1',
    //         ref: 'origin/master',
    //         repo: 'GIT_REPOSITORY',
    //         path: '.',
    //         'pre-deploy-local': '',
    //         'post-deploy':
    //             'NODE_ENV=production yarn --production=false;yarn build; && pm2 startOrReload ecosystem.config.js',
    //         'pre-setup': ''
    //     }
    // }
};

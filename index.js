const ping = require('ping');
const cron = require('node-cron');

const pattern = RegExp('^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$');
const hosts = process.argv.splice(2).filter((host) => pattern.test(host));

if (hosts.length) {
    console.log('\x1b[32m', 'Monitoring...');
    // ping every minute
    cron.schedule('* * * * *', () => {
        require('./src/index')(ping, hosts);
    });
    return;
}

console.log('\x1b[31m', 'Input a valid host name using `npm start hostname.com` ');

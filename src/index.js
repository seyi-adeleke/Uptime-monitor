var winston = require('winston');
require('winston-loggly-bulk');
require('dotenv').config()

winston.add(winston.transports.Loggly, {
    token: process.env.LOG_TOKEN,
    subdomain: process.env.LOG_SUBDOMAIN,
    tags: ["Winston-NodeJS"],
    json:true
});

// takes a ping object and an array of hostnames
module.exports = (ping, hosts) => {
    hosts.forEach((host) => {
        ping.promise.probe(host)
        .then((res) => {
            if (res.alive) {
                winston.log('info', `${host} is up`);
                return;
            } else {
                winston.log('error', `${host} is down`);

            }
        });
    })
}
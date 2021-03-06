var config = {
    local: {
        mode: 'local',
        port: 3000,
    },
    staging: {
        mode: 'staging',
        port: 4000,
    },
    prod: {
        mode: 'prod',
        port: 5000,
    },
    mongo: {
        mode: 'mongo',
        host: '127.0.0.1',
        port: 27017,
    },
}

module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
}

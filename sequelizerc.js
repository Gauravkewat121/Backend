const path = require('path');

module.exports = {
    'config': path.resolve('config', 'config.js'),
    'models-path': path.resolve('models'),
    'seeders-path': path.resolve('seeders'),
    'migrations-path': path.resolve('migrations')
};


// npx sequelize-auto  -h localhost -d MOVIE_THEATRE -u root -p 3306 -x ScottTiger@123 -e mysql
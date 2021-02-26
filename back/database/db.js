const { Sequelize } = require('sequelize');

const db = new Sequelize('football_db', 'postgres', 'postgres',{
    //host: 'localhost',
    host: 'football_db',
    dialect: 'postgres',

    pool: {
        max:5,
        min: 0
    }
});

exports.db = db;
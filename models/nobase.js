'use strict'

module.exports = (sequelize, DataType) => {
    var nobase = sequelize.define('nobase', {
        no : {
            type: DataType.INTEGER,
            unique : true,
            autoIncrement: true,
            primaryKey : true,
            allowNull: false
        },
        todo : {
            type: DataType.STRING,
            unique : true,
            allowNull: false
        }
    },
    {
        timestamps: false
    });
    return nobase;
};
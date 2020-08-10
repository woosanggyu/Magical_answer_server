'use strict'

module.exports = (sequelize, DataType) => {
    var user = sequelize.define('user', {
        no : {
            type: DataType.INTEGER,
            unique : true,
            autoIncrement: true,
            primaryKey : true,
            allowNull: false
        },
        ID : {
            type: DataType.STRING,
            unique : true,
            allowNull: false
        },
        Password : {
            type: DataType.STRING,
            allowNull: false
        },
        Nickname : {
            type: DataType.STRING,
            allowNull: false
        },
        Gender : {
            type: DataType.STRING,
            allowNull: false
        },
        Age : {
            type: DataType.INTEGER,
            allowNull: false
        },
        CreateTime : {
            type: DataType.DATE,
            allowNull: false
        },
    },
    {
        timestamps: false
    });
    return user;
};
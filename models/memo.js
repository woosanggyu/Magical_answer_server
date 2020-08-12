'use strict'

module.exports = (sequelize, DataType) => {
    var memo = sequelize.define('memo', {
        no : {
            type: DataType.INTEGER,
            unique : true,
            autoIncrement: true,
            primaryKey : true,
            allowNull: false
        },
        writer : {
            type: DataType.STRING,
            allowNull: false
        },
        title : {
            type: DataType.STRING,
            allowNull: false
        },
        content : {
            type: DataType.STRING,
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
    return memo;
};
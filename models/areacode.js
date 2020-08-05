'use strict'

module.exports = (sequelize, DataType) => {
    var areacode = sequelize.define('areacode', {
        no : {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        areacode : {
            type: DataType.INTEGER,
            allowNull: false
        },
        sigunguCode : {
            type: DataType.INTEGER,
            allowNull: false
        },
        areaname : {
            type: DataType.STRING,
            allowNull: false
        },
        areafather : {
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    });
    return areacode;
};
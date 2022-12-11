const { DataTypes } = require("sequelize");

module.exports = (database, DataTypes) => {
    const User = database.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname:{
            type: DataTypes.STRING,
            allowNull : false
        },
        pseudo:{
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },
        email : {
            type: DataTypes.STRING,
            unique: true,
            allowNull : false
        }, 
        password: {
            type : DataTypes.STRING,
            allowNull : false
        },
        isAdmin: {
            type : DataTypes.BOOLEAN,
        }
    });

    return User;
};
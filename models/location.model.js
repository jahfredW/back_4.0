const { DataTypes} = require("sequelize");

module.exports = (database, DataTypes) => {
    const Location = database.define("location", {
      city: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
    });
  
    return Location;
  };
const { DataTypes} = require('sequelize');

module.exports = (database, DataTypes) => {
    const Member = database.define("member", {
      name: {
        type: DataTypes.STRING
      },
      surname: {
        type: DataTypes.STRING
      },
      
      email: {
        type: DataTypes.STRING
      },
      question: {
        type: DataTypes.STRING
      },
      agree: {
        type: DataTypes.BOOLEAN,
        default: false
      }
      
    },
    {
      timestamps: false,
    });
  
    return Member;
  };
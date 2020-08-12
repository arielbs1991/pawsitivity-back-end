const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var Matches = sequelize.define("Matches", {
       isLiked: {
           type: DataTypes.BOOLEAN,
           allowNull: false
       }
    });

    Matches.associate = function (models) {
        Matches.belongsTo(models.User, { 
            unique: 'uniqueMatches',
            foreignKey: 'userId', 
            onDelete: 'cascade' 
        });
        Matches.belongsTo(models.Pet, {
            unique: 'uniqueMatches',
            foreignKey: 'petId',
            onDelete: 'cascade'
        });
    };
    return Matches;
};
const Sequelize = require("sequelize");
const sequelize = require("./index");

//DO WE JUST WANT TO SAVE PETFINDERID, ISLIKED, SHELTERID(AUTOGENED), AND USERID(AUTOGENED) IN THIS TABLE, AND RENDER ALL THE OTHER ASPECTS THROUGH A QUERY AS NEEDED??? yes.

//have secondary query to return pet by petfinderid

module.exports = function (sequelize, DataTypes) {
    var AnimalMatch = sequelize.define("AnimalMatch", {
        isLiked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    AnimalMatch.associate = function (models) {
        AnimalMatch.belongsTo(models.User, {
            onDelete: 'cascade'
        });
        AnimalMatch.belongsTo(models.AnimalShelter, {
            onDelete: 'cascade'
        });
        AnimalMatch.belongsTo(models.Animal, {
            onDelete: 'cascade'
        });
    };

    return AnimalMatch;
};
const Sequelize = require("sequelize");
const sequelize = require("./index");

//DO WE JUST WANT TO SAVE PETFINDERID, ISLIKED, SHELTERID(AUTOGENED), AND USERID(AUTOGENED) IN THIS TABLE, AND RENDER ALL THE OTHER ASPECTS THROUGH A QUERY AS NEEDED??? yes.

//have secondary query to return pet by petfinderid

module.exports = function (sequelize, DataTypes) {
    var PetfinderMatch = sequelize.define("PetfinderMatch", {
        petfinderId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isLiked: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    PetfinderMatch.associate = function (models) {
        PetfinderMatch.belongsTo(models.User, {
            onDelete: 'cascade'
        });
        PetfinderMatch.belongsTo(models.PetfinderShelter, {
            onDelete: 'cascade'
        });
    };

    return PetfinderMatch;
};
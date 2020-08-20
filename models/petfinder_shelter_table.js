const Sequelize = require("sequelize");
const sequelize = require("./index");

//Just save shelterid and associations, and use shelterid to query and render shelter information
module.exports = function (sequelize, DataTypes) {
    var PetfinderShelter = sequelize.define("PetfinderShelter", {
        orgId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1]
            }
        },
    });

    PetfinderShelter.associate = function (models) {
        PetfinderShelter.hasMany(models.PetfinderMatch, {
            onDelete: 'cascade'
        });
    };

    return PetfinderShelter;
};

const Sequelize = require("sequelize");
const sequelize = require("./index");

//Just save shelterid and associations, and use shelterid to query and render shelter information
module.exports = function (sequelize, DataTypes) {
    var AnimalShelter = sequelize.define("AnimalShelter", {
        orgId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1]
            }
        },
        AnimalshelterName: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    AnimalShelter.associate = function (models) {
        AnimalShelter.hasMany(models.AnimalMatch, {
            onDelete: 'cascade'
        });
        AnimalShelter.hasMany(models.Animal, {
            onDelete: 'cascade'
        });
    };

    return AnimalShelter;
};

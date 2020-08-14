const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var Shelter = sequelize.define("Shelter", {
        shelterName: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
            validate: {
                len: [1]
            }
        },
        orgId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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

    Shelter.associate = function (models) {
        Shelter.hasMany(models.Match, {
            foreignKey: 'shelterId',
            unique: 'uniqueMatch',
            onDelete: 'cascade'
        });
    };

    return Shelter;
};

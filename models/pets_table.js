const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {
        petName: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: 'uniquePet',
            validate: {
                len: [1]
            }
        },
        isDog: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        age: {
            type: DataTypes.STRING,
            // unique: 'uniquePet',
            notEmpty:false
        },
        breed: {
            type: DataTypes.STRING,
            // unique: 'uniquePet',
            notEmpty:false
        },
        sex: {
            type: DataTypes.STRING,
            // unique: 'uniquePet',
            notEmpty:false
        },
        size: {
            type: DataTypes.STRING,
            // unique: 'uniquePet',
            notEmpty:false
        },
        likesKids: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        likesDogs: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        likesCats: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    });

    Pet.associate = function (models) {
        Pet.hasMany(models.Matches, {
            foreignKey: 'petId',
            unique: 'uniqueMatches',
            onDelete: 'cascade'
        });
        Pet.hasMany(models.Shelter, {
            foreignKey: 'shelterId',
            onDelete: 'cascade'
        });
    };
    return Pet;
};
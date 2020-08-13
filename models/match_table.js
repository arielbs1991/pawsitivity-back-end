const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var Match = sequelize.define("Match", {
        isLiked: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
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
            // unique: 'uniquePet',
            allowNull: false
        },
        age: {
            type: DataTypes.STRING,
            // unique: 'uniquePet',
            notEmpty: false
        },
        breed: {
            type: DataTypes.STRING,
            // unique: 'uniquePet',
            notEmpty: false
        },
        sex: {
            type: DataTypes.STRING,
            // unique: 'uniquePet',
            notEmpty: false
        },
        size: {
            type: DataTypes.STRING,
            // unique: 'uniquePet',
            notEmpty: false
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

    Match.associate = function (models) {
        Match.belongsTo(models.User, {
            unique: 'uniqueMatch',
            foreignKey: 'userId',
            onDelete: 'cascade'
        });
        Match.belongsTo(models.Shelter, {
            unique: 'uniqueMatch',
            foreignKey: 'shelterId',
            onDelete: 'cascade'
        });
    };
    return Match;
};
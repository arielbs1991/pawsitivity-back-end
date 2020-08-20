const Sequelize = require("sequelize");
const sequelize = require("./index");

//add constraints and validators later
module.exports = function (sequelize, DataTypes) {
    var Animal = sequelize.define("Animal", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imageSrc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secondaryBreed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        likesCats: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        likesDogs: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        likesKids: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Animal.associate = function (models) {
        Animal.hasMany(models.AnimalMatch, {
            onDelete: 'cascade'
        });
        Animal.belongsTo(models.AnimalShelter, {
            onDelete: 'cascade'
        });
    };

    return Animal;
};
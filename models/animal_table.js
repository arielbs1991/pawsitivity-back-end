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
        imageSrc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
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
        size: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        likesCats: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        likesDogs: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        likesKids: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    });

    Animal.associate = function (models) {
        Animal.hasMany(models.Match, {
            foreignKey: 'animalId',
            unique: 'uniqueMatch',
            onDelete: 'cascade'
        });
        Animal.belongsTo(models.Shelter, {
            foreignKey: 'shelterId',
            unique: 'uniqueAnimal',
            onDelete: 'cascade'
        });
    };

    return Animal;
};
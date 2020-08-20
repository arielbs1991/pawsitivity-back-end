const Sequelize = require("sequelize");
const sequelize = require("./index");

//DO WE JUST WANT TO SAVE PETFINDERID, ISLIKED, SHELTERID(AUTOGENED), AND USERID(AUTOGENED) IN THIS TABLE, AND RENDER ALL THE OTHER ASPECTS THROUGH A QUERY AS NEEDED??? yes.

//have secondary query to return pet by petfinderid

module.exports = function (sequelize, DataTypes) {
    var Match = sequelize.define("Match", {
        petfinderId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        isLiked: {
            type: DataTypes.STRING,
            allowNull: false,
        },
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

    Match.associate = function (models) {
        Match.belongsTo(models.User, {
            unique: 'uniqueMatch',
            foreignKey: 'userId',
            onDelete: 'cascade'
        });
        Match.belongsTo(models.Shelter, {
            unique: 'uniqueMatch',
            foreignKey: 'matchId',
            onDelete: 'cascade'
        });
        Match.belongsTo(models.Animal, {
            unique: 'uniqueMatch',
            // foreignKey: 'animalId',
            onDelete: 'cascade'
        });
    };

    return Match;
};
// DOES THIS NEED TO BE IN THE MATCHES TABLE BECAUSE WE AREN'T STORING THE INFORMATION FROM THE PETFINDER API, WE ONLY NEED TO STORE DATA FOR PETS THAT HAVE BEEN SELECTED FOR USERS

// const Sequelize = require("sequelize");
// const sequelize = require("./models/index");

// module.exports = function (sequelize, DataTypes) {
//     var Pet = sequelize.define("Pet", {
        // petName: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     // unique: 'uniquePet',
        //     validate: {
        //         len: [1]
        //     }
        // },
        // isDog: {
        //     type: DataTypes.BOOLEAN,
        //     // unique: 'uniquePet',
        //     allowNull: false
        // },
        // age: {
        //     type: DataTypes.STRING,
        //     // unique: 'uniquePet',
        //     notEmpty:false
        // },
        // breed: {
        //     type: DataTypes.STRING,
        //     // unique: 'uniquePet',
        //     notEmpty:false
        // },
        // sex: {
        //     type: DataTypes.STRING,
        //     // unique: 'uniquePet',
        //     notEmpty:false
        // },
        // size: {
        //     type: DataTypes.STRING,
        //     // unique: 'uniquePet',
        //     notEmpty:false
        // },
        // likesKids: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: true
        // },
        // likesDogs: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: true
        // },
        // likesCats: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: true
        // }
    // });

    // Pet.associate = function (models) {
    //     Pet.hasMany(models.Matches, {
    //         foreignKey: 'petId',
    //         unique: 'uniqueMatches',
    //         onDelete: 'cascade'
    //     });
    //     Pet.hasMany(models.Shelter, {
    //         foreignKey: 'shelterId',
    //         // unique: 'uniquePet',
    //         onDelete: 'cascade'
    //     });
    // };
    // return Pet;

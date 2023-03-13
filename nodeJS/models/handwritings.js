// const { sequelize } = require(".");
// const navigation = require("./navigation");


module.exports=(sequelize,DataTypes)=>{
    const HandWriting = sequelize.define('handWritings',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        image_path: {type: DataTypes.STRING, allowNull: false},
        image_name: {type: DataTypes.STRING, allowNull: false},
        image_type: {type: DataTypes.STRING, allowNull: false},
        transcription_path: {type: DataTypes.STRING, allowNull: false},
        transcription_name: {type: DataTypes.STRING, allowNull: false},
        transcription_type: {type: DataTypes.STRING, allowNull: false},
        description: DataTypes.STRING,
        path_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName:true,
        timestamps: false
    });
    return HandWriting;
}
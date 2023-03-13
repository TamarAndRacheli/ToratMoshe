module.exports=(sequelize,DataTypes)=>{
    const Correction = sequelize.define('corrections',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        handwriting_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        word_index: DataTypes.INTEGER,
        new_word: DataTypes.STRING,
        original_word: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: DataTypes.DATE
    },
    {
        freezeTableName:true,
        timestamps: false
    });
    return Correction;
}
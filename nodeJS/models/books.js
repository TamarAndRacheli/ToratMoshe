// const navigation = require("./navigation");


module.exports=(sequelize,DataTypes)=>{
    const Book = sequelize.define('books',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        image_path: {type: DataTypes.STRING, allowNull: false},
        image_name: {type: DataTypes.STRING, allowNull: false},
        image_type: {type: DataTypes.STRING, allowNull: false},
        description: DataTypes.STRING,
        price: DataTypes.FLOAT(5,2),
        name: {type: DataTypes.STRING, allowNull: false}
        

    },
    {
        freezeTableName:true,
        timestamps: false
    });
    return Book;
}
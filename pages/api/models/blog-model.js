import { DataTypes } from 'sequelize';
import sequelize from "@/db-connection/postgre-connection";

const BlogModel = sequelize.define('Blog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    experience: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
},
    {
        tableName: "blog"
    }
);

export default BlogModel;
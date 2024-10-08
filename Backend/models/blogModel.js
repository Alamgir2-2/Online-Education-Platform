import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Assuming you have a config file for Sequelize

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true, // Image can be optional
  },
}, {
  timestamps: true, // Automatically handle createdAt and updatedAt
});

export default Blog;

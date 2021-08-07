// Import what we need
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    
    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true


    },
    product_name: {

      type: DataTypes.STRING,
      allowNull: false,

    },
    price: {

      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {

        isDecimal: true

      }

    },
    stock: {

      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      isNumeric: true,
      Validate: {
        isNumeric: true
      }


    },
    category_id: {

      type: DataTypes.INTEGER,
      references: {

        model: 'category',
        key: 'id'

      }


    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;

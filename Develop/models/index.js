// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

Category.belongsTo(Product, {
  foreignKey: 'id',
});

Category.hasMany(Product, {
  foreignKey: 'player_id',
  onDelete: 'CASCADE',
});


Product.belongToMany(Tag, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
});

Tag.belongToMany(Product, {
  foreignKey: 'id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

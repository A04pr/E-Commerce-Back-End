const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// get one category
router.get('/:category_id', async (req, res) => {
  try {
    const categoryId = req.params.category_id;
    const category = await Category.findOne({
      where: { id: categoryId },
      include: Product,
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// create new category
router.post('/', async (req, res) => {
  const { category_name } = req.body;
  try {
    const newCategory = await Category.create({ category_name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// update category
router.put('/:category_id', async (req, res) => {
  const categoryId = req.params.category_id;
  const { category_name } = req.body;

  try {
    const category = await Category.findByPk(categoryId);

    if (category) {
      await Category.update({ category_name }, { where: { category_id: categoryId } });
      res.status(200).json({ message: 'Category updated successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// delete category
router.delete('/:category_id', async (req, res) => {
  const categoryId = req.params.category_id;

  try {
    const category = await Category.findByPk(categoryId);

    if (category) {
      await Category.destroy({ where: { category_id: categoryId } });
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
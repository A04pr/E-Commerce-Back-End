const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/api/categories', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({include: Product });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/api/categories/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = req.params.id;
    const category = await Category.findOne({
      where: { id: categoryId },
      include: Product 
    });
    res.json(category);

    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/api/categories', async (req, res) => {
  // create a new category
  const { category_name } = req.body;
  try {
    const newCategory = await Category.create({ category_name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/api/categories/:category_id', async (req, res) => {
    // update a category by its `id` value
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

router.delete('/api/categories/:id', async (req, res) => {
    // delete a category by its `id` value
  const categoryId = req.params.id;

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

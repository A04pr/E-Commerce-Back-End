const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag },
      ]
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// get one product
router.get('/:product_id', async (req, res) => {
  try {
    const productId = req.params.product_id;
    const product = await Product.findOne({
      where: { product_id: productId },
      include: [
        { model: Category },
        { model: Tag },
      ]
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// update product
router.put('/:product_id', async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.product_id,
      },
    });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json(error);
  }
});

// delete product
router.delete('/:product_id', async (req, res) => {
  const productId = req.params.product_id;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      await Product.destroy({ where: { product_id: productId } });
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
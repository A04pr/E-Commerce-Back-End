const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product,
    });
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// get one tag
router.get('/:tag_id', async (req, res) => {
  try {
    const tagId = req.params.tag_id;
    const tag = await Tag.findOne({
      where: { tag_id: tagId },
      include: Product,
    });
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error('Error fetching tag:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// create new tag
router.post('/', async(req, res) => {
  const { tag_name } = req.body;
  try {
    const newTag = await Tag.create({ tag_name });
    res.status(201).json(newTag);
  } catch (error) {
    console.error('Error adding tag:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// update tag
router.put('/:tag_id', async (req, res) => {
  const tagId = req.params.tag_id;
  const { tag_name } = req.body;

  try {
    const tag = await Tag.findByPk(tagId);

    if (tag) {
      await Tag.update({ tag_name }, { where: { tag_id: tagId } });
      res.status(200).json({ message: 'Tag updated successfully' });
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// delete tag
router.delete('/:tag_id', async (req, res) => {
  const tagId = req.params.tag_id;

  try {
    const tag = await Tag.findByPk(tagId);

    if (tag) {
      await Tag.destroy({ where: { tag_id: tagId } });
      res.status(200).json({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

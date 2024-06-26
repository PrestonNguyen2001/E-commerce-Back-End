const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    await Tag.findAll({
      include: { 
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      },
    }).then((productData) => res.json(productData))
    .catch((err) => {
      res.status(500).json(err);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: { 
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      },
    });
    return res.status(200).json(tagData);
  }
  catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagCreate = await Tag.create(req.body);
    res.status(200).json(tagCreate);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true
    });
    res.status(200).json(tagUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Delete all ProductTags associated with the tag
    await ProductTag.destroy({
      where: {
        tag_id: req.params.id,
      },
    });

    // Delete the tag
    const tagDel = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagDel) {
      return res.status(404).json({ message: "No tag found with this id!" });
    }

    res.status(200).json({ message: "Tag has been removed from the database" });
  } catch (err) {
    console.error("Error deleting tag:", err); // Log the error for debugging
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;

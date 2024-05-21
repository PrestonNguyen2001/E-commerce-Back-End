const router = require("express").Router();
const { Category, Product, ProductTag } = require("../../models"); // Make sure ProductTag is imported

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    return res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    return res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);

    // Fetch the newly created category with its associated products (if any)
    const categoryData = await Category.findByPk(newCategory.id, {
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });

    return res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find the category by its id
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      return res
        .status(404)
        .json({ message: "No category found with this id!" });
    }

    // Get all products associated with the category
    const products = await Product.findAll({
      where: {
        category_id: req.params.id,
      },
    });

    // Delete all ProductTags associated with each product
    for (const product of products) {
      await ProductTag.destroy({
        where: {
          product_id: product.id,
        },
      });
    }

    // Delete all products associated with the category
    await Product.destroy({
      where: {
        category_id: req.params.id,
      },
    });

    // Delete the category
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    res
      .status(200)
      .json({
        message:
          "A category and its associated products have been removed from the database",
      });
  } catch (err) {
    console.error("Error deleting category:", err); // Log the error for debugging
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;

import express from "express";

const router = express.Router();

// Endpoint público para obtener productos
router.get("/", async (req, res) => {
  try {
    const client = req.app.locals.contentfulClient;
    const response = await client.getEntries({
      content_type: "plutoCustom",
      include: 1,
    });
    const products = response.items.map((item) => ({
      id: item.sys.id,
      name: item.fields.name,
      description: item.fields.description,
      price: item.fields.price,
      used: item.fields.used,
      images: item.fields.image
        ? item.fields.image.map((asset) => asset.fields.file.url)
        : [],
      category: item.fields.category,
    }));

    res.json(products);
  } catch (error) {
    console.error("Error fetching products from Contentful:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los productos de Contentful" });
  }
});

export default router;

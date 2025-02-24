import pkg from "contentful";
import dotenv from "dotenv";

dotenv.config();

const { createClient } = pkg;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const fetchProducts = async () => {
  const response = await client.getEntries({ content_type: "plutoCustom" });
  return response.items.map((item) => {
    const fields = item.fields;
    if (fields.images && Array.isArray(fields.images)) {
      fields.imageUrls = fields.images.map((image) => image.fields.file.url);
    }
    return fields;
  });
};

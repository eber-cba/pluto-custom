export const fetchProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
};

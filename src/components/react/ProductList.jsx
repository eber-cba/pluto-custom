import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ErrorBoundary from "./ErrorBoundary";

const ProductList = ({ products }) => {
  const [filters, setFilters] = useState({
    used: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredProducts = products.filter((product) => {
    let valid = true;
    if (filters.used !== "") {
      valid = valid && product.used === (filters.used === "true");
    }
    if (filters.minPrice) {
      valid = valid && product.price >= parseFloat(filters.minPrice);
    }
    if (filters.maxPrice) {
      valid = valid && product.price <= parseFloat(filters.maxPrice);
    }
    return valid;
  });

  return (
    <ErrorBoundary>
      <div>
        <div style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
          <div>
            <label>Usado: </label>
            <select name="used" onChange={handleFilterChange}>
              <option value="">Todos</option>
              <option value="true">Usado</option>
              <option value="false">Nuevo</option>
            </select>
          </div>
          <div>
            <label>Precio Mínimo: </label>
            <input
              type="number"
              name="minPrice"
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label>Precio Máximo: </label>
            <input
              type="number"
              name="maxPrice"
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProductList;

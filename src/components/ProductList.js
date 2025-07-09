// ProductList component to display a list of products
import React, { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 16, padding: 8, width: 300 }}
      />
      {filteredProducts.length === 0 ? (
        <div>No products found.</div>
      ) : (
        filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;
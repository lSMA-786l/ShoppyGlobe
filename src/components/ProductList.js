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

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <main className="product-list-container">
      <section className="search-section">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
      </section>
      
      {filteredProducts.length === 0 ? (
        <p className="no-products">No products found matching your search.</p>
      ) : (
        <section className="product-list">
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
};

export default ProductList;
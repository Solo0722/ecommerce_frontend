import { Breadcrumb, Skeleton } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { AppContext } from "../../context/Context";
import categoriesStyles from "../../styles/Categories.module.css";

const AllProducts = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const { fetchAllProducts, products } = useContext(AppContext);

  useEffect(() => {
    !products ? setLoading(true) : setLoading(false);
  }, [products]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className={categoriesStyles.container}>
      <div className={categoriesStyles.navWrapper}>
        <Breadcrumb separator=">">
          <Breadcrumb.Item onClick={() => router.push("/")}>
            <a>Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a>All Products</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1>ALL PRODUCTS</h1>
      </div>
      <div className={categoriesStyles.bodyWrapper}>
        {products?.map((product, i) => (
          <Skeleton
            key={i}
            loading={loading}
            style={{
              width: 240,
            }}
          >
            <ProductCard product={product} />
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;

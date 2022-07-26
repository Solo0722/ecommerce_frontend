import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import categoriesStyles from "../../styles/Categories.module.css";
import { commerce } from "../../lib/commerce";
import { Breadcrumb, Button, Card, Skeleton, Spin } from "antd";
import { AppContext } from "../../context/Context";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";

const Categories = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const { fetchProductsByCategory, products } = useContext(AppContext);

  useEffect(() => {
    !products ? setLoading(true) : setLoading(false);
  }, [router, products]);

  useEffect(() => {
    fetchProductsByCategory(router.query.category);
  }, [router]);

  return (
    <div className={categoriesStyles.container}>
      <div className={categoriesStyles.navWrapper}>
        <Breadcrumb separator=">">
          <Breadcrumb.Item onClick={() => router.push("/")}>
            <a>Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a>{router.query.category}</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1>{router.query?.category?.toUpperCase()}</h1>
      </div>
      <div className={categoriesStyles.bodyWrapper}>
        {!products ? (
          <Spin />
        ) : (
          products?.map((product, i) => (
            <Skeleton
              key={i}
              loading={loading}
              style={{
                width: 240,
              }}
            >
              <ProductCard product={product} />
            </Skeleton>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;

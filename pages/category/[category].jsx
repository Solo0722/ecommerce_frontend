import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import categoriesStyles from "../../styles/Categories.module.css";
import { commerce } from "../../lib/commerce";
import { Breadcrumb, Button, Card, Skeleton } from "antd";
import { AppContext } from "../../context/Context";
import { ShoppingOutlined } from "@ant-design/icons";
import ProductCard from "../../components/ProductCard";

const Categories = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const { fetchProducts, products } = useContext(AppContext);

  useEffect(() => {
    !products ? setLoading(true) : setLoading(false);
  }, [router, products]);

  useEffect(() => {
    fetchProducts(router.query.category);
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

export default Categories;

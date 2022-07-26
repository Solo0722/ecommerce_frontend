import { Breadcrumb, Skeleton, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { AppContext } from "../../context/Context";
import categoriesStyles from "../../styles/Categories.module.css";

const Search = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const { fetchProductsBySearch, products } = useContext(AppContext);

  useEffect(() => {
    !products ? setLoading(true) : setLoading(false);
  }, [products]);

  useEffect(() => {
    fetchProductsBySearch(router.query.search);
  }, [router]);

  return (
    <div className={categoriesStyles.container}>
      <div className={categoriesStyles.navWrapper}>
        <Breadcrumb separator=">">
          <Breadcrumb.Item onClick={() => router.push("/")}>
            <a>Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a>Search</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1>Search results for {router.query.search}</h1>
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

export default Search;

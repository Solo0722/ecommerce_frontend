import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import categoriesStyles from "../../styles/Categories.module.css";
import { commerce } from "../../lib/commerce";
import { Breadcrumb, Card, Skeleton } from "antd";

const Categories = ({ data }) => {
  const router = useRouter();

  const [products, setProducts] = useState(data);
  const [loading, setLoading] = useState(true);
  console.log(products);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
        <h1>{router.query.category.toUpperCase()}</h1>
      </div>
      <div className={categoriesStyles.bodyWrapper}>
        {products.map((product, i) => (
          <Skeleton
            loading={loading}
            style={{
              width: 240,
            }}
          >
            <Card
              key={i}
              hoverable
              loading={loading}
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={product.image.url} />}
            >
              <Card.Meta
                title={product.name}
                description={
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                    <p>{product.price.formatted_with_symbol}</p>
                  </div>
                }
              />
            </Card>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { category } = context.params;
  const { data } = await commerce.products.list({
    category_slug: [`${category}`],
  });

  return {
    props: { data },
  };
};

export default Categories;

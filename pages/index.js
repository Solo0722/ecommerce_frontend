import { Carousel, notification } from "antd";
import homeStyles from "../styles/Home.module.css";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { commerce } from "../lib/commerce";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const banner_items = [
  {
    name: "Macbook Pro",
    brand: "Apple",
    price: "$2,999.99",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit!",
    background: "macbook.jpg",
  },
  {
    name: "Dell Core I7",
    brand: "Dell",
    price: "$1,349.99",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit!",
    background: "dell.jpg",
  },
  {
    name: "Macbook 8",
    brand: "Apple",
    price: "$1,499.99",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit!",
    background: "macbook2.jpg",
  },
  {
    name: "Dell Core I5",
    brand: "Dell",
    price: "$1,249.99",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit!",
    background: "dell2.jpg",
  },

  {
    name: "Iphone 13",
    brand: "Apple",
    price: "$1,049.99",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit!",
    background: "iphone13.jpg",
  },
];

export default function Home() {
  const router = useRouter();

  const [categories, setCategories] = useState(null);
  const [bestSelling, setBestSelling] = useState(null);
  const [newArrivals, setNewArrivals] = useState(null);

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();
    setCategories(data);
  };

  const bestSellingProducts = async () => {
    const { data } = await commerce.products.list({
      category_slug: [`${"Best-Selling"}`],
    });
    setBestSelling(data);
  };

  const newArrivalProducts = async () => {
    const { data } = await commerce.products.list({
      category_slug: [`${"New-Arrivals"}`],
    });
    setNewArrivals(data);
  };

  useEffect(() => {
    fetchCategories();
    bestSellingProducts();
    newArrivalProducts();
  }, []);

  return (
    <div className={homeStyles.homeContainer}>
      <Carousel
        autoplay
        style={{ width: "100%", marginRight: "0px" }}
        effect="fade"
      >
        {banner_items.map((item, i) => (
          <Banner item={item} key={i} />
        ))}
      </Carousel>
      <div className={homeStyles.secondaryContainer}>
        <h2>Best Selling Products</h2>
        <div className={homeStyles.bestSellingWrapper}>
          {bestSelling?.map((bs, i) => (
            <ProductCard key={i} product={bs} />
          ))}
        </div>
        <h2>New Arrivals</h2>
        <div className={homeStyles.bestSellingWrapper}>
          {newArrivals?.map((na, i) => (
            <ProductCard key={i} product={na} />
          ))}
        </div>
        <h2>Shop by brand</h2>
        {categories && (
          <div className={homeStyles.horizontalOverflowContainer}>
            {categories[3]?.children?.map((brand) => (
              <div style={{ display: "inline-block" }} key={brand.name}>
                <div
                  onClick={() => router.push(`/category/${brand.name}`)}
                  className={homeStyles.brandsContainer}
                >
                  <img src={brand.assets[0].url} alt="brand-img" />
                  <h3>{brand.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
        <h2>Shop by collections</h2>
        {categories && (
          <div className={homeStyles.horizontalOverflowContainer}>
            {categories[4]?.children?.map((collection) => (
              <div style={{ display: "inline-block" }} key={collection.name}>
                <div
                  onClick={() => router.push(`/category/${collection.name}`)}
                  className={homeStyles.brandsContainer}
                >
                  <img src={collection.assets[0].url} />
                  <h3>{collection.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

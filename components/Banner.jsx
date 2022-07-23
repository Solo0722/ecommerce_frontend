import { Button } from "antd";
import React from "react";
import bannerStyles from "../styles/Banner.module.css";

const Banner = ({ item }) => {
  return (
    <div
      className={bannerStyles.container}
      style={{ backgroundImage: `url(/${item.background})` }}
    >
      <p>{item.brand}</p>
      <h2 className="animate__animated animate__fadeInUp">{item.price}</h2>
      <h1 className="animate__animated animate__fadeInUp">{item.name}</h1>
      <Button type="primary">Shop now</Button>
      <div className={bannerStyles.bannerDescription}>
        <h3>Description</h3>
        <p>{item.desc}</p>
      </div>
    </div>
  );
};

export default Banner;

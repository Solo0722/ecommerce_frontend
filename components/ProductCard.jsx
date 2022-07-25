import { ShoppingFilled, ShoppingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AppContext } from "../context/Context";
import cardStyles from "../styles/ProductCard.module.css";

const ProductCard = ({ product }) => {
  const { handleAddToCart } = useContext(AppContext);
  const router = useRouter();

  return (
    <div
      className={cardStyles.container}
      onClick={() => router.push(`/productDetails/${product.id}`)}
    >
      <img src={product.image.url} alt="product-image" />
      <h3>{product.name}</h3>
      <p dangerouslySetInnerHTML={{ __html: product.description }} />
      <div className={cardStyles.priceContainer}>
        <p>{product.price.formatted_with_symbol}</p>
        <Button
          icon={<ShoppingOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product.id, 1);
          }}
          style={{ marginBottom: "5px", marginRight: "5px" }}
        />
      </div>
    </div>
  );
};

export default ProductCard;

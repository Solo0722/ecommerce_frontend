import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import productDetailStyles from "../../styles/ProductDetail.module.css";
import { Spin, Rate, Button, Carousel, message } from "antd";
import { commerce } from "../../lib/commerce";
import { AppContext } from "../../context/Context";
import ProductCard from "../../components/ProductCard";

const ProductDetail = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);

  const { fetchCart, cart, handleRemoveFromCart, handleUpdateCartQty,handleAddToCart } =
    useContext(AppContext);

  const fetchSingleProduct = async (productId) => {
    const data = await commerce.products.retrieve(productId);
    console.log(data);
    setProduct(data);
  };

  useEffect(() => {
    router.query.id && fetchSingleProduct(router.query.id);
  }, [router.query.id]);

  return (
    <div className={productDetailStyles.container}>
      {!product ? (
        <Spin />
      ) : (
        <div className={productDetailStyles.productContainer}>
          <div className={productDetailStyles.imgContainer}>
            <Carousel
              autoplay
              fade
              dots={false}
              style={{ width: "100%", height: "100%" }}
            >
              {product.assets.map((asset) => (
                <div className={productDetailStyles.imgSecondaryContainer}>
                  <img src={asset.url} alt="image" />
                </div>
              ))}
            </Carousel>
          </div>
          <div className={productDetailStyles.bodyContainer}>
            <h2>{product.name}</h2>
            <h3>{product.price.formatted_with_symbol}</h3>

            <div className={productDetailStyles.detailsWrapper}>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
                amet deleniti veniam officia laboriosam, quaerat commodi
                necessitatibus tenetur incidunt deserunt placeat, repudiandae
                possimus harum exercitationem, quos nemo id autem illo?
              </p>
              <p dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            {/* <Button.Group>
              <Button
                onClick={() =>
                  handleUpdateCartQty(product.id, product.quantity - 1)
                }
              >
                -
              </Button>
              <Button>{product.quantity}</Button>
              <Button
                onClick={() =>
                  handleUpdateCartQty(product.id, product.quantity + 1)
                }
              >
                +
              </Button>
            </Button.Group> */}
            <Rate
              allowHalf
              count={5}
              value={parseFloat(product.attributes[0].value)}
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <Button
              type="primary"
              size="large"
              onClick={() => {
                handleAddToCart(product.id, 1);
                message.success("Product added to cart");
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>
      )}
      {product && (
        <div className={productDetailStyles.othersContainer}>
          <h1>You may also like</h1>
          <div className={productDetailStyles.othersSecondaryContainer}>
            {product.related_products?.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

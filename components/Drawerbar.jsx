import {
  CloseCircleFilled,
  CloseCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Badge, Button, Drawer, Empty } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/Context";
import cartStyles from "../styles/Cart.module.css";
import { BsCartX } from "react-icons/bs";

const Drawerbar = () => {
  const [visible, setVisible] = useState(false);

  const { fetchCart, cart, handleRemoveFromCart, handleUpdateCartQty } =
    useContext(AppContext);

  const showDrawer = () => {
    setVisible(true);
  };
  console.log(cart);

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const EmptyCart = () => {
    return (
      <Empty description="No items in cart" image={<BsCartX size={"70px"} />}>
        <Button type="link" onClick={onClose}>
          Continue shopping
        </Button>
      </Empty>
    );
  };

  const FilledCart = () => {
    return (
      <div className={cartStyles.container}>
        {cart?.line_items?.map((item, i) => (
          <div className={cartStyles.cartItem} key={i}>
            <img src={item.image.url} width={"100px"} height={"100px"} />
            <div className={cartStyles.secondaryContainer}>
              <h4>{item.name}</h4>
              <Button.Group>
                <Button
                  onClick={() =>
                    handleUpdateCartQty(item.id, item.quantity - 1)
                  }
                >
                  -
                </Button>
                <Button>{item.quantity}</Button>
                <Button
                  onClick={() =>
                    handleUpdateCartQty(item.id, item.quantity + 1)
                  }
                >
                  +
                </Button>
              </Button.Group>
            </div>
            <div className={cartStyles.secondaryContainer}>
              <h4>{item.line_total.formatted_with_symbol}</h4>
              <Button
                onClick={() => handleRemoveFromCart(item.id)}
                type="text"
                icon={<CloseCircleOutlined />}
                style={{
                  color: "red",
                }}
              />{" "}
            </div>
          </div>
        ))}
        <div className={cartStyles.totalPriceContainer}>
          <h3>
            <span>Subtotal</span>
            <span>{cart?.subtotal.formatted_with_symbol}</span>
          </h3>
          <Button type="primary" block shape="round">
            PAY WITH STRIPE
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Button
        type="text"
        shape="circle"
        onClick={showDrawer}
        icon={
          <Badge
            count={cart?.total_items}
            overflowCount={9}
            style={{ background: "#1890ff" }}
          >
            <ShoppingOutlined />
          </Badge>
        }
      />
      <Drawer
        title={
          <h4 style={{ marginTop: "10px" }}>
            Shopping cart
            <span style={{ color: "#1890ff" }}>
              {" "}
              ({cart?.total_items} items)
            </span>
          </h4>
        }
        closeIcon={<CloseCircleFilled />}
        placement="right"
        onClose={onClose}
        visible={visible}
        headerStyle={{ borderBottom: "none" }}
      >
        {!cart || cart?.line_items?.length === 0 ? (
          <EmptyCart />
        ) : (
          <FilledCart />
        )}
      </Drawer>
    </>
  );
};

export default Drawerbar;

import { ShoppingOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/Context";

const Drawerbar = () => {
  const [visible, setVisible] = useState(false);

  const { fetchCart, cart } = useContext(AppContext);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const EmptyCart = () => {
    return (
      <Empty description="No items in cart">
        <Button type="link" onClick={onClose}>
          Continue shopping
        </Button>
      </Empty>
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
        title="Shopping Cart (2 items)"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <EmptyCart />
      </Drawer>
    </>
  );
};

export default Drawerbar;

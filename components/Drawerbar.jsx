import { ShoppingOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Empty } from "antd";
import React, { useState } from "react";

const Drawerbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

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
            count={2}
            overflowCount={9}
            style={{ background: "#1890ff" }}
            children={<ShoppingOutlined />}
          />
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

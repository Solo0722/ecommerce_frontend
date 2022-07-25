import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, List } from "antd";
import React, { useState } from "react";
import navStyles from "../styles/Navbar.module.css";
import { FiMenu } from "react-icons/fi";

const NavigationDrawerbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const categoryMenu = [
    {
      name: "Mobile Phones",
    },
    {
      name: "Laptops",
    },
    {
      name: "Chromebooks",
    },
    {
      name: "Desktops",
    },
    {
      name: "Tablets",
    },
    {
      name: "Accessories",
    },
  ];
  const brandsMenu = [
    {
      name: "Apple",
    },
    {
      name: "Del",
    },
    {
      name: "Lenovo",
    },
    {
      name: "Hp",
    },
    {
      name: "Samsung",
    },
    {
      name: "Others",
    },
  ];

  return (
    <div className={navStyles.navigationDrawerbar}>
      <Button type="text" onClick={showDrawer} icon={<FiMenu />} />
      <Drawer
        placement="left"
        onClose={onClose}
        visible={visible}
        width={"50%"}
        headerStyle={{ display: "none" }}
        bodyStyle={{ margin: "0px", padding: "10px 0px" }}
      >
        <List>
          <List.Item
            style={{ paddingLeft: "5px", border: "none", fontWeight: "bolder" }}
          >
            Home
          </List.Item>
          <List.Item
            style={{ paddingLeft: "5px", border: "none", fontWeight: "bolder" }}
          >
            Categories
          </List.Item>
          <List>
            {categoryMenu.map((c, i) => (
              <List.Item
                key={i}
                style={{
                  paddingLeft: "10px",
                  paddingTop: "0px",
                  border: "none",
                }}
              >
                <Button type="text" block style={{ textAlign: "left" }}>
                  {c.name}
                </Button>
              </List.Item>
            ))}
          </List>
          <List.Item
            style={{ paddingLeft: "5px", border: "none", fontWeight: "bolder" }}
          >
            Brands
          </List.Item>
          {brandsMenu.map((b, i) => (
            <List.Item
              key={i}
              style={{
                paddingLeft: "10px",
                paddingTop: "0px",
                border: "none",
              }}
            >
              <Button type="text" block style={{ textAlign: "left" }}>
                {b.name}
              </Button>
            </List.Item>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default NavigationDrawerbar;

import {
  BranchesOutlined,
  CarryOutTwoTone,
  GroupOutlined,
  HomeOutlined,
  HomeTwoTone,
  MenuOutlined,
} from "@ant-design/icons";
import { Button, Drawer, List } from "antd";
import React, { useState } from "react";
import navStyles from "../styles/Navbar.module.css";
import { FiMenu } from "react-icons/fi";
import { useRouter } from "next/router";

const NavigationDrawerbar = () => {
  const router = useRouter();
  console.log(router);

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
      url: "/category/mobile-phones",
    },
    {
      name: "Laptops",
      url: "/category/laptop",
    },
    {
      name: "Chromebooks",
      url: "/category/chromebooks",
    },
    {
      name: "Desktops",
      url: "/category/desktops",
    },
    {
      name: "Tablets",
      url: "/category/tablets",
    },
    {
      name: "Accessories",
      url: "/category/accessories",
    },
  ];
  const brandsMenu = [
    {
      name: "Apple",
      url: "/category/apple",
    },
    {
      name: "Dell",
      url: "/category/dell",
    },
    {
      name: "Lenovo",
      url: "/category/lenovo",
    },
    {
      name: "Hp",
      url: "/category/hp",
    },
    {
      name: "Samsung",
      url: "/category/samsung",
    },
    {
      name: "Others",
      url: "/category/others",
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
          <List.Item style={{ paddingLeft: "5px", border: "none" }}>
            <Button
              icon={<HomeOutlined />}
              type="text"
              block
              onClick={() => router.push("/")}
              style={{
                textAlign: "left",
                padding: "0",
                color: `${router.asPath === "/" ? "#1890ff" : ""}`,
              }}
            >
              Home
            </Button>
          </List.Item>
          <List.Item style={{ paddingLeft: "5px", border: "none" }}>
            <Button
              icon={<GroupOutlined />}
              type="text"
              block
              onClick={() => router.push("/category")}
              style={{
                textAlign: "left",
                padding: "0",
                color: `${router.asPath === "/category" ? "#1890ff" : ""}`,
              }}
            >
              Collections
            </Button>
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
                <Button
                  type="text"
                  block
                  onClick={() => router.push(c.url)}
                  style={{
                    textAlign: "left",
                    color: `${router.asPath === c.url ? "#1890ff" : ""}`,
                  }}
                >
                  {c.name}
                </Button>
              </List.Item>
            ))}
          </List>
          <List.Item style={{ paddingLeft: "5px", border: "none" }}>
            <Button
              icon={<BranchesOutlined />}
              type="text"
              block
              onClick={() => router.push("/category")}
              style={{
                textAlign: "left",
                padding: "0",
                color: `${router.asPath === "/category" ? "#1890ff" : ""}`,
              }}
            >
              Brands
            </Button>
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
              <Button
                type="text"
                block
                onClick={() => router.push(b.url)}
                style={{
                  textAlign: "left",
                  color: `${router.asPath === b.url ? "#1890ff" : ""}`,
                }}
              >
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

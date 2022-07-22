import {
  ArrowDownOutlined,
  CaretDownFilled,
  CaretDownOutlined,
  DownOutlined,
  SearchOutlined,
  ShoppingOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Badge, Menu, Dropdown } from "antd";
import React from "react";
import navStyles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import Drawerbar from "./Drawerbar";

const categoryMenu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a target="_blank" rel="noopener noreferrer" href="">
            Mobile phones
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a target="_blank" rel="noopener noreferrer">
            Tablets
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a target="_blank" rel="noopener noreferrer">
            Laptops
          </a>
        ),
      },
      {
        key: "4",
        label: (
          <a target="_blank" rel="noopener noreferrer">
            Chromebooks
          </a>
        ),
      },
      {
        key: "5",
        label: (
          <a target="_blank" rel="noopener noreferrer">
            Desktops
          </a>
        ),
      },
      {
        key: "6",
        label: (
          <a target="_blank" rel="noopener noreferrer">
            Monitors
          </a>
        ),
      },
      {
        key: "7",
        label: (
          <a target="_blank" rel="noopener noreferrer">
            Accessories
          </a>
        ),
      },
      {
        key: "8",
        label: (
          <a target="_blank" rel="noopener noreferrer">
            Server
          </a>
        ),
      },
    ]}
  />
);
const brandMenu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a target="_blank" rel="noopener noreferrer" href="">
            Apple
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a target="_blank" rel="noopener noreferrer">
            Dell
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            HP
          </a>
        ),
      },
      {
        key: "4",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            Lenovo
          </a>
        ),
      },
      {
        key: "5",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            Samsung
          </a>
        ),
      },
      {
        key: "6",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            Tecno
          </a>
        ),
      },
      {
        key: "7",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            Infinix
          </a>
        ),
      },
      {
        key: "8",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            Panasonic
          </a>
        ),
      },
    ]}
  />
);

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className={navStyles.container}>
      <h3>Streamline</h3>

      <div className={navStyles.navigationContainer}>
        <Button
          type="text"
          href="/"
          style={{
            color: `${router.route == "/" ? " #1890ff" : ""}`,
          }}
        >
          Home
        </Button>
        <Dropdown overlay={categoryMenu}>
          <Button type="text">
            Categories <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown overlay={brandMenu}>
          <Button type="text">
            Brands <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <div className={navStyles.linksContainer}>
        <Button type="text" shape="circle" icon={<SearchOutlined />} />
        <Button type="text" shape="circle" icon={<UserOutlined />} />
        <Drawerbar />
      </div>
    </nav>
  );
};

export default Navbar;

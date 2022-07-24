import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown } from "antd";
import React from "react";
import navStyles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import Drawerbar from "./Drawerbar";
import Image from "next/image";



const Navbar = () => {
  const router = useRouter();

  const categoryMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/mobile phones")}
            >
              Mobile phones
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/tablets")}
            >
              Tablets
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/laptops")}
            >
              Laptops
            </a>
          ),
        },
        {
          key: "4",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/chromebooks")}
            >
              Chromebooks
            </a>
          ),
        },
        {
          key: "5",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/desktops")}
            >
              Desktops
            </a>
          ),
        },
        {
          key: "7",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/accessories")}
            >
              Accessories
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
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/apple")}
            >
              Apple
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/dell")}
            >
              Dell
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/hp")}
            >
              HP
            </a>
          ),
        },
        {
          key: "4",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/lenovo")}
            >
              Lenovo
            </a>
          ),
        },
        {
          key: "5",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/samsung")}
            >
              Samsung
            </a>
          ),
        },
        {
          key: "6",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/tecno")}
            >
              Tecno
            </a>
          ),
        },
        {
          key: "7",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/infinix")}
            >
              Infinix
            </a>
          ),
        },
        {
          key: "8",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/panasonic")}
            >
              Panasonic
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <nav className={navStyles.container}>
      <Image src="/ripple.png" alt="logo" width="30px" height="30px" />

      <div className={navStyles.navigationContainer}>
        <Button
          type="text"
          onClick={() => router.push("/")}
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

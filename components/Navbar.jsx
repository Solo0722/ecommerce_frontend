import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown, Avatar } from "antd";
import React, { useContext } from "react";
import navStyles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import Drawerbar from "./Drawerbar";
import Image from "next/image";
import NavigationDrawerbar from "./NavigationDrawerbar";
import Searchbar from "./Searchbar";
import { AppContext } from "../context/Context";

const Navbar = () => {
  const router = useRouter();

  const { user, setUser } = useContext(AppContext);

  const signOut = () => {
    // if (typeof window !== "undefined") {
    //   localStorage.clear();
    // }
    localStorage.clear();
    setUser(null);
  };

  const categoryMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/")}
            >
              All
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/mobile-phones")}
            >
              Mobile phones
            </a>
          ),
        },
        {
          key: "3",
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
          key: "4",
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
          key: "5",
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
          key: "6",
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
          key: "8",
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
              onClick={() => router.push("/category/")}
            >
              All
            </a>
          ),
        },
        {
          key: "2",
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
          key: "3",
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
          key: "4",
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
          key: "5",
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
          key: "6",
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
          key: "7",
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => router.push("/category/others")}
            >
              Others
            </a>
          ),
        },
      ]}
    />
  );
  const avatarMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: <a rel="noopener noreferrer">{user?.result?.email}</a>,
        },
        {
          key: "2",
          label: (
            <a rel="noopener noreferrer" onClick={signOut}>
              Sign out
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <nav className={navStyles.container}>
      <div className={navStyles.logoContainer}>
        <NavigationDrawerbar />
        <Image
          src="/ripple.png"
          alt="logo"
          width="30px"
          height="30px"
          onClick={() => router.push("/")}
        />
      </div>

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
            Collections <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown overlay={brandMenu}>
          <Button type="text">
            Brands <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <div className={navStyles.linksContainer}>
        <Searchbar />
        {user ? (
          <Dropdown overlay={avatarMenu}>
            <Avatar
              style={{ cursor: "pointer" }}
              size="small"
              children={user?.result?.firstName?.slice(0, 1)}
            />
          </Dropdown>
        ) : (
          <Button
            type="text"
            shape="circle"
            icon={<UserOutlined />}
            onClick={() => router.push("/auth")}
          />
        )}

        <Drawerbar />
      </div>
    </nav>
  );
};

export default Navbar;

import { SearchOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/Context";

const Searchbar = () => {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const { fetchCart, cart } = useContext(AppContext);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const popularSearches = [
    "Iphone 13",
    "Macbook Air",
    "Hp Pavillion Gaming",
    "Samsung Galaxy A20",
  ];

  const handleSearch = () => {
    onClose();
    router.push(`/search/${searchTerm}`);
  };

  return (
    <>
      <Button
        type="text"
        shape="circle"
        icon={<SearchOutlined />}
        onClick={showDrawer}
      />

      <Drawer
        placement="top"
        onClose={onClose}
        visible={visible}
        height={"27%"}
        headerStyle={{ display: "none" }}
      >
        <Form>
          <Input
            suffix={
              <Button
                type="text"
                shape="circle"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                htmlType="submit"
              />
            }
            size="small"
            placeholder="Search..."
            style={{ borderRadius: "20px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>
        <div>
          <h3 style={{ margin: "5px 0" }}>Popular Searches</h3>
          {popularSearches.map((p, i) => (
            <Button
              key={i}
              shape="round"
              type="ghost"
              style={{ margin: "5px 7px", border: "2px solid #1890ff" }}
            >
              {p}
            </Button>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Searchbar;

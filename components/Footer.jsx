import {
  FacebookFilled,
  InstagramFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const Footer = () => {
  return (
    <div className="footerContainer">
      <p>&copy;2022 Streamline All Rights Reserved</p>
      <div>
        <Button type="text" icon={<FacebookFilled />} />
        <Button type="text" icon={<TwitterCircleFilled />} />
        <Button type="text" icon={<InstagramFilled />} />
      </div>
    </div>
  );
};

export default Footer;

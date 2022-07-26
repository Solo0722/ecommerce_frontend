import { Button } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import Footer from "../components/Footer";
import { AppContext } from "../context/Context";
import { runFireworks } from "../lib/confetti";

const Success = () => {
  const { order } = useContext(AppContext);

  const router = useRouter();

  useEffect(() => {
    runFireworks();
  }, []);

  return (
    <div className="successContainer">
      <div className="bodyWrapper">
        <p>
          <BsBagCheckFill color="green" size={"35px"} />
        </p>
        <h2>Thank you for your purchase, {order?.customer?.firstname} :)</h2>
        <h3>Check your email inbox for your receipt.</h3>
        <p>
          If you have any questions, please contact us at{" "}
          <a href="">rippleorg@gmail.com</a>.
        </p>
        <Button type="primary" onClick={() => router.push("/")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default Success;

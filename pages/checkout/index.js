import React, { useContext, useEffect, useState } from "react";
import checkoutStyles from "../../styles/Checkout.module.css";
import { Steps } from "antd";
import AddressForm from "../../components/AddressForm";
import PaymentForm from "../../components/PaymentForm";
import { commerce } from "../../lib/commerce";
import { AppContext } from "../../context/Context";
import { useRouter } from "next/router";

const { Step } = Steps;

const Checkout = () => {
  const [current, setCurrent] = useState(0);
  const { cart, setCheckoutToken, checkoutToken } = useContext(AppContext);

  const router = useRouter();

  const generateCheckoutToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart?.id, {
        type: "cart",
      });
      setCheckoutToken(token);
    } catch (error) {
      router.push("/");
      console.log(error);
    }
  };

  useEffect(() => {
    generateCheckoutToken();
  }, [cart]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Delivery Details",
      content: <AddressForm next={next} checkoutToken={checkoutToken} />,
    },
    {
      title: "Payment",
      content: (
        <PaymentForm prev={prev} next={next} checkoutToken={checkoutToken} />
      ),
    },
  ];

  return (
    <div className={checkoutStyles.container}>
      <h2>Checkout</h2>
      <Steps current={current} size="small" responsive>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
    </div>
  );
};

export default Checkout;

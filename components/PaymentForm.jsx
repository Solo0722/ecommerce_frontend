import React, { useContext } from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import checkoutStyles from "../styles/Checkout.module.css";
import ReviewOrder from "./ReviewOrder";
import { Button, Divider, Form } from "antd";
import { AppContext } from "../context/Context";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  "pk_test_51KH5oqE641vyIsfnvG4PxqrG5LDbLvUh2KVpC1TmMxn2uGMr1nR4ejLSGXRdTMNmQNEkyJmQqlPGqOMROYwLmn7B00Drn1OCEI"
);

const PaymentForm = ({ prev, checkoutToken }) => {
  const { shippingData, order, handleCaptureCheckout, errorMessage } =
    useContext(AppContext);

  const router = useRouter();

  const onFinish = async (values, elements, stripe) => {
    console.log("Success:", values);

    // if (!stripe || !elements) return;

    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });
    console.log(shippingData.shippingOption);

    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: "Primary",
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: {
        shipping_method: shippingData.shippingOption,
      },
      // payment: {
      //   gateway: "stripe",
      //   stripe: {
      //     payment_method_id: paymentMethod.id,
      //   },
      // },
      payment: {
        gateway: "test_gateway",
        card: {
          number: "4242424242424242",
          expiry_month: "02",
          expiry_year: "24",
          cvc: "123",
          postal_zip_code: "94107",
        },
      },
    };
    handleCaptureCheckout(checkoutToken.id, orderData);
    router.push("/success");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={checkoutStyles.addressFormWrapper}>
      <ReviewOrder checkoutToken={checkoutToken} />
      <Divider />
      <div>
        <h2>Payment Method</h2>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={() => onFinish(elements, stripe)}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                layout="vertical"
              >
                <CardElement />
                <br />
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Button onClick={() => prev()}>Back</Button>
                  <Button disabled={!stripe} htmlType="submit" type="primary">
                    PAY WITH STRIPE
                  </Button>
                </div>
              </Form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentForm;

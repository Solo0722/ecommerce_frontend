import { List } from "antd";
import React from "react";
import checkoutStyles from "../styles/Checkout.module.css";

const ReviewOrder = ({ checkoutToken }) => {
  console.log(checkoutToken);
  return (
    <div className={checkoutStyles.reviewContainer}>
      <h2 style={{ fontWeight: "bold", textAlign: "left" }}>Order Summary</h2>
      <List>
        {checkoutToken?.live?.line_items.map((item) => (
          <List.Item
            key={item.name}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <h3 style={{ fontWeight: "bold" }}>{item.name}</h3>
              <h3>{item.line_total.formatted_with_symbol}</h3>
            </div>
            <p style={{ textAlign: "left" }}>Quantity: {`${item.quantity}`}</p>
          </List.Item>
        ))}
        <List.Item
          style={{ display: "flex", flexDirection: "row", width: "100%" }}
        >
          <h2 style={{ fontWeight: "bold", textAlign: "left" }}>Subtotal</h2>
          <h3 style={{ fontWeight: "bold" }}>
            {checkoutToken?.live?.subtotal.formatted_with_symbol}
          </h3>
        </List.Item>
      </List>
    </div>
  );
};

export default ReviewOrder;

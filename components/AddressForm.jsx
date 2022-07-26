import { Button, Form, Input, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import checkoutStyles from "../styles/Checkout.module.css";
import { commerce } from "../lib/commerce";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { AppContext } from "../context/Context";

const { Option } = Select;

const AddressForm = ({ next, checkoutToken }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const { shippingData, setShippingData } = useContext(AppContext);

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken?.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken?.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((so, i) => ({
    id: so.id,
    label: `${so.description} - ${so.price.formatted_with_symbol}`,
  }));

  const onFinish = (values) => {
    console.log("Success:", values);
    //  form.resetFields();
    setShippingData(values);
    next();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={checkoutStyles.addressFormWrapper}>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        layout="vertical"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                min: 3,
                message: "Invalid name!",
              },
            ]}
            style={{ width: "49%" }}
          >
            <Input placeholder="First name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            style={{ width: "49%" }}
            rules={[
              {
                required: true,
                min: 3,
                message: "Invalid name!",
              },
            ]}
          >
            <Input placeholder="Last name" />
          </Form.Item>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            name="email"
            style={{ width: "49%" }}
            rules={[
              {
                required: true,
                type: "email",
                message: "Invalid email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="address1"
            style={{ width: "49%" }}
            rules={[
              {
                required: true,
                message: "Invalid address!",
              },
            ]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            name="city"
            style={{ width: "49%" }}
            rules={[
              {
                required: true,
                message: "Invalid city!",
              },
            ]}
          >
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item
            name="zip"
            style={{ width: "49%" }}
            rules={[
              {
                required: true,
                message: "Invalid zip/postal code!",
              },
            ]}
          >
            <Input placeholder="ZIP / Postal code" />
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            name="shippingCountry"
            style={{ width: "49%" }}
            rules={[
              {
                required: true,
                message: "Invalid shipping country!",
              },
            ]}
          >
            <Select
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e)}
              placeholder="Shipping country"
            >
              {countries.map((c, i) => (
                <Option value={c.id} key={i}>
                  {c.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="shippingSubdivision"
            style={{ width: "49%" }}
            rules={[
              {
                required: true,
                message: "Invalid shipping subdivision!",
              },
            ]}
          >
            <Select
              value={shippingSubdivision}
              onChange={(e) => setShippingSubdivision(e)}
              placeholder="Shipping subdivision"
            >
              {subdivisions.map((s, i) => (
                <Option value={s.id} key={i}>
                  {s.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            name="shippingOption"
            style={{ width: "49%" }}
            rules={[
              {
                required: true,
                message: "Invalid shipping option!",
              },
            ]}
          >
            <Select
              value={shippingOption}
              onChange={(e) => setShippingOption(e)}
              placeholder="Shipping option"
            >
              {options.map((option, i) => (
                <Option value={option.id} key={i}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Form.Item>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => router.push("/category")}
            >
              Continue shopping
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddressForm;

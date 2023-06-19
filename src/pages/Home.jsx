import { PlusOutlined } from "@ant-design/icons";
import addItem from '../utils/addItem.js'
import React, { useState, useEffect } from "react";
import "../assets/Home.css";
import LOG from "../assets/Log.svg";
import { Link } from "react-router-dom";
import VIDO from "../assets/Sample2.mp4";
import { Button, Modal } from "antd";
import Pro from "../assets/Pro.png";
const { TextArea } = Input;

import {
  Upload,
  AutoComplete,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
import Box from "../components/Box";

const { Option } = Select;
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Home() {
  const [form] = Form.useForm();
  const [isNotCustomer, setIsNotCustomer] = useState(true);

  useEffect(() => {
    const handleFill = () => {
      let data = JSON.parse(localStorage.getItem("id"));
      form.setFieldsValue({
        name: data.name,
        email: data.email,
      });
      //also btn visibility
      if (data.designation === "Customer") {
        setIsNotCustomer(false);
      }
    };
    handleFill();
  }, []);
  //Prepopulte  the form from local storage self calling on mount

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isaddopen, setIsAddOpen] = useState(false);
  const openAdd = () => {
    setIsAddOpen(true);
  };
  const handleAddOk = () => {
    setIsAddOpen(false);
  };
  const handleAddCancel = () => {
    setIsAddOpen(false);
  };
  //Upload Button Props
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [checked, setchecked] = useState(false);
  const onChange = (e) => {
    // console.log(`checked has = ${e.target.checked}`);
    setchecked(!e.target.checked);
    // console.log("Tos end",checked)
  };
  const handleAdd = (values) => {
    console.log(values);
    const mode   = values.draft ? "draft" : "realStore" 
   
    const details = {
      name: values.product_name,
      description: values.description,
      price: values.product_price,
      draftOption: values.draft,
    };
    addItem(details , mode)
    //checking data and pushing object
    const size = localStorage.getItem("products");
    if (size === null) {
      let data1 = [];
      data1.push(details);
      localStorage.setItem("products", JSON.stringify(data1));
    } else {
      let currentItem = JSON.parse(localStorage.getItem("products"));
      currentItem.push(details);
      localStorage.setItem("products", JSON.stringify(currentItem));
    }
    form.resetFields();
    setIsAddOpen(false);
  };

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    localStorage.setItem("id", JSON.stringify(values));
    setIsModalOpen(false);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+91</Option>
        <Option value="87">+1</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <>
      <div className="NavBar">
        <div className="homeHeading">
          <br />
        </div>

        <div className="leftNav">
          <span>Features</span>
          <span>Pricing</span>
          <span>Testimonials</span>
          <img src={LOG} alt="" id="systam" />
          <span>Resources</span>
          <span>Company</span>
          <span>Contact</span>

          <Button type="none" id="rty" onClick={showModal}>
            <img src={Pro} alt="" width="35px" />
          </Button>
          <Modal
            width={1000}
            footer={null}
            title="Your Profile "
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div className="profi">
                <Form
                  {...formItemLayout}
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  initialValues={{
                    residence: ["zhejiang", "hangzhou", "xihu"],
                    prefix: "86",
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  scrollToFirstError
                >
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: false,
                        message: "Please input your E-mail!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="name"
                    label="Name"
                    tooltip="What do you want others to call you?"
                    rules={[
                      {
                        message: "Please input your nickname!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="residence"
                    label="Habitual Residence"
                    rules={[
                      {
                        type: "array",
                        message: "Please select your habitual residence!",
                      },
                    ]}
                  >
                    <Cascader options={residences} />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                      {
                        required: false,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={prefixSelector}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                      {
                        required: false,
                        message: "Please select gender!",
                      },
                    ]}
                  >
                    <Select placeholder="select your gender">
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      Update Details
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className="img--con">
                <img
                  src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                  style={{
                    paddingLeft: "10rem",
                    borderRadius: "60%",
                    paddingTop: "1rem",
                  }}
                  alt="err"
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>

      <div className="banner">
        <div>
          <img
            src={LOG}
            style={{
              paddingBottom: "3rem",
              paddingTop: "7rem",
              paddingLeft: "-3rem",
            }}
            alt=""
          />
          <video
            src={VIDO}
            autoPlay
            muted
            loop
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              position: "absolute",
              paddingTop: "2rem",
              paddingBottom: "3rem",
              width: "60rem",
              height: "40rem",
              top: "10rem",
              right: "1rem",
              opacity: "0.8",
            }}
          ></video>

          <h1 style={{ paddingLeft: "5rem", width: "600px" }}>
            A powerful online engagement tool that's <br /> intuitive and simple
            to use.
          </h1>
          <p className="pcf">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. <br /> Velit officia consequat duis enim velit mollit.
            Exercitation veniam
          </p>

          <Button
            type="primary"
            className={isNotCustomer ? "btn" : "vis--cus"}
            onClick={openAdd}
            style={{
              width: "200px",
              backgroundColor: "black",
              paddingLeft: "1rem",
              height: "3rem",
              borderRadius: "1rem",
            }}
          >
            Add a Product
          </Button>
          <Modal
            title="Add Product Details"
            open={isaddopen}
            onOk={handleAddOk}
            footer={null}
            onCancel={handleAddCancel}
            style={{ paddingTop: "2rem" }}
          >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={(values) => handleAdd(values)}
            >
              <div className="addcontainer">
                <Form.Item
                  label="Image      "
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  {" "}
                  <center>
                    <Upload action="/upload.do" listType="picture-card">
                      <div>
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </div>
                    </Upload>
                  </center>
                </Form.Item>
                <Form.Item
                  name="product_name"
                  label="Name"
                  tooltip="What do you want others to call you?"
                  rules={[
                    {
                      message: "Please input your nickname!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input style={{ width: "22rem", marginLeft: "2.2rem" }} />
                </Form.Item>
                <Form.Item label="Desciption" name="description">
                  <TextArea
                    rows={4}
                    style={{ width: "22rem", marginLeft: "1.6rem" }}
                  />
                </Form.Item>
                <Form.Item
                  name="product_price"
                  label="Price"
                  rules={[
                    {
                      message: "Please input your price!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input style={{ width: "10rem", marginLeft: "4rem" }} />
                </Form.Item>

                <Form.Item
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                  name="draft"
                >
                  <Checkbox style={{ paddingTop: "1rem" }}>
                    <p style={{ paddingTop: "2.8px" }}>Add to Draft</p>{" "}
                  </Checkbox>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button
                    style={{
                      width: "100px",
                      backgroundColor: "black",
                      paddingLeft: "1rem",
                      height: "3rem",
                      borderRadius: "1rem",
                      marginRight: "1rem",
                    }}
                    onClick={handleAdd}
                    type="primary"
                    htmlType="submit"
                  >
                    Add
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
      <Box />
    </>
  );
}

export default Home;

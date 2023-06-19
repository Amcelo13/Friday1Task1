import { PlusOutlined } from "@ant-design/icons";
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
import React, { useEffect, useState } from "react";
import db from "../data/Mock.json";
import "./Box.scss";
import { handelDeleteItem } from "../utils/changeData";
import { updateProduct } from "../utils/changeData";
import { Button, Modal } from "antd";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
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
function Box() {
  const [form] = Form.useForm();

  const [isaddopen, setIsAddOpen] = useState(false);
  const [index ,setIndex] = useState(-1)
  const [mode ,setMode] = useState('')

  const openAdd = (i,m) => {
    setIsAddOpen(true);
    setIndex(i)
    setMode(m)
  };
  const handleAddOk = () => {
    setIsAddOpen(false);
  };
  const handleAddCancel = () => {
    setIsAddOpen(false);
  };

  //onfinish
  const handleAdd = (values) => {
    console.log(values);
    updateProduct(values, mode, index)
    setIsAddOpen(false);
  };
  const [realStore, setRealStore] = useState([]);
  const [myDraft, setDraft] = useState([]);
  // const useType = localStorage.getItem('useType');
  
  useEffect(() => {
    if (localStorage.getItem("realStore")) {
      let data = JSON.parse(localStorage.getItem("realStore"));
      setRealStore([...data]);
    }
    if (localStorage.getItem("draft")) {
      let dummydraft = JSON.parse(localStorage.getItem("draft"));
      setDraft([...dummydraft]);
    }
  },);  //infinite loop

  const handleDelete = (i,mode) => {
    handelDeleteItem(i,mode);
  };

  return (
    <>
      <h1 style={{ paddingTop: "2rem" }}> Products</h1>
      <div className="boxes">
        {realStore.map((e, i) => {
          if (e.name !== ''){
          return (
            <div key={i}>
              <div className="box">
                <img
                  src="https://i.pinimg.com/originals/a3/29/66/a32966c2ab5ba98a7332a72eb1953c48.jpg"
                  alt=""
                  className="imgca"
                />
                <div className="hash">
                  <h3>{e.name}</h3>
                  <h4>₹{e.price}</h4>
                </div>

                <p>{e.description}</p>
                <button onClick={()=>openAdd(i,"realStore")}>Edit</button>
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
                        Edit
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Modal>
                <button onClick={()=>handleDelete(i,"realStore")}>Delete</button>
              </div>
            </div>
          );}
        })}
      </div>
            <h1 style={{ paddingTop: "2rem" }}> Drafts</h1>
      <div className="boxes b1">
        {myDraft.map((e, i) => {

          if (e.name !== ""){
          return (
            <div key={i}>
              <div className="box">
                <img
                  src="https://i.pinimg.com/originals/a3/29/66/a32966c2ab5ba98a7332a72eb1953c48.jpg"
                  alt=""
                  className="imgca"
                />
                <div className="hash">
                  <h3>{e.name}</h3>
                  <h4>₹{e.price}</h4>
                  <button></button>
                </div>

                <p>{e.description}</p>
                <button onClick={()=>handleDelete(i,"draft")}>Delete</button>
              </div>
            </div>
          );}
        })}
      </div>
    </>
  );
}

export default Box;

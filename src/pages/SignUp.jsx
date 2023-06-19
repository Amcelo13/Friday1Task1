import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./SignUp.css";
import LOG from "../assets/Log.svg";
import VID from "../assets/Sample.mp4";
import { Button, Checkbox, Form, Input } from "antd";
import { Radio } from "antd";
const plainOptions = ["Apple", "Pear", "Orange"];
const options = [
  {
    label: "Admin",
    value: "Admin",
  },
  {
    label: "Vendor",
    value: "Vendor",
  },
  {
    label: "Customer",
    value: "Customer",
  },
];

function SignUp() {
  const navigate = useNavigate();

  const [value3, setValue3] = useState("Admin");
  const onChange3 = ({ target: { value } }) => {
    console.log("radio3 checked", value);
    setValue3(value);
    
  };
 
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    const creds = {
      email: values.user.email,
      password: values.password,
      name: values.username,
      designation:value3
    };
    //checking data and pushing object
    const size = localStorage.getItem("items");
    if (size === null) {
      let data = []
      data.push(creds)
      localStorage.setItem("items", JSON.stringify(data));
    } else {
      let getCurrentItem = localStorage.getItem("items");
      let currentItem = JSON.parse(getCurrentItem);
      currentItem.push(creds);
      localStorage.setItem("items", JSON.stringify(currentItem));
    }
    // console.log(values.user.email); //It is value of email from input
    // console.log(values.password); //It is value of password from input
    navigate("./login");
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="left_div">
        <img
          src={LOG}
          alt=""
          style={{ marginLeft: "-3rem", marginTop: "5rem", width: "150px" }}
        />
        <p id="desc">"Building a Digital Smart Future with Industry Insights</p>
        <video
          src={VID}
          style={{ width: "600px", height: "500px" }}
          loop
          autoPlay
          muted
        ></video>
      </div>

      <div className="right_div">
        <div className="last_class">
          <p className="fg"> Already have an account? </p>
          <button id="re" type="button" onClick={handleNavigate}>
            Log In
          </button>
        </div>

        <div className="form-start">
          <p id="desc_1">Sign Up to Circle</p>

          <div className="sign_up_container">
            <div className="google">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAkpwZzBGGTMue65hgkkFUh4jpjAbi_DoAuK41CEM&s"
                alt=""
                width="50px"
                height="50px"
                style={{
                  marginLeft: "-4.5rem",
                  marginRight: "2rem",
                  paddingTop: "3px",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
              />
              <p className="bhu">Sign up with Google</p>
            </div>

            <div className="twitter">
              <img
                src="https://img.icons8.com/?size=512&id=1bj89U1Ansyb&format=png"
                alt=""
                width="25px"
              />
            </div>
          </div>
          <p className="or">-OR-</p>
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={(values) => onFinish(values)}
        >
          <div
            className="flex1"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
              paddingLeft: "22.5rem",
              marginBottom: "2rem",
            }}
          >
            <div className="name">
              <p id="ui1" className="labelled cu1">
                Name
              </p>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input required className="hj" />
              </Form.Item>
            </div>
            <div className="username">
              <p id="ui1" className="labelled cu">
                Username
              </p>
              <Input required className="hj" />
            </div>
          </div>
          <p id="ui" className="labelled">
            Email
          </p>
          <div className="gdd">
            <Form.Item
              name={["user", "email"]}
              // label="Email"
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input required style={{ width: "400px" }} />
            </Form.Item>
          </div>
          <p className="labelled">Password </p>
          <div className="moi">
            <Form.Item
              name="password"
              // label="Password"
              rules={[
                {
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                required
                id="yui"
                placeholder="Input password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>
          <div className="rad">
            <Radio.Group
              options={options}
              onChange={onChange3}
              value={value3}
              optionType="button"
              buttonStyle="solid"
            />
          </div>
          <Form.Item>
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                outline: "none",
                paddingLeft: "3rem",
                paddingRight: "3rem",
                paddingBottom: "2rem",
                paddingTop: "0.5rem",
              }}
              htmlType="submit"
              className="login-form-button ggyu"
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;

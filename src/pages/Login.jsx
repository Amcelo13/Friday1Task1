import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./Login.css";
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

function Login() {
  const [value3, setValue3] = useState("Admin");
  const onChange3 = ({ target: { value } }) => {
    console.log("radio3 checked", value);
    setValue3(value);
  };

  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

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
    //items is array

    const items = JSON.parse(localStorage.getItem("items"));
    let result = false;
    console.log("Rtf", items);

    for (let item of items){
      if (item.email === values.user.email && item.password === values.password && item.designation === value3){
        result = true;
        localStorage.setItem("id", JSON.stringify(item));
        break;
      }
    }

    if (result === true && values.user.email !== "") {
      navigate("/home");
    } else {
      alert("User not found");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate input fields before submitting the form
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
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
        <div className="form-start">
          <p id="desc_12">Log In to Circle</p>

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
          onFinish={onFinish}
        >
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

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
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
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;

/*import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
export default function Signup() {
           const [isLoading, setIsLoading] = useState(false);
           //const [error, setError] = useState("");
           const navigate = useNavigate()
          function onFinish(values) {
          const registerUser = async()=>{
           setIsLoading(true)
           try{
            const response = await axios.post('http://localhost:5500/register',values)
            console.log(response,response.data)
            if(response.data.success){
               toast.success(response.data.message)
            }
            else{
                toast.error(response.data.message)
            }
            setIsLoading(false)
            navigate('/')
           // if(response.data.error) throw new Error(response.data.error)
           }
           catch(error){
            toast.error('Something went wrong')
           }
           
          }
          registerUser()
        }     
    return (
        <div className="authentication">
          <div className="authentication-form card p-3">
            <h1 className="card-title">Nice To Meet U</h1>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Name" name="name">
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input placeholder="Password" type="password" />
              </Form.Item>
    
              <Button
                className="primary-button my-2 full-width-button"
                htmltype="submit" 
                disabled= {isLoading}
              >
                REGISTER
              </Button>
    
              <Link to="/login" className="anchor mt-2">
                CLICK HERE TO LOGIN
              </Link>
            </Form>
          </div>
        </div>
      ); 
  }
*/
import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async(values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('http://localhost:5500/register',values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (

    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Nice To Meet U</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            REGISTER
          </Button>

          <Link to="/login" className="anchor mt-2">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;

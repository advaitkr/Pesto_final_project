/*import React from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux"
import axios from 'axios';
function ProtectedRoute(props) {
 const {user} = useSelector((state)=>state.user)
 const navigate = useNavigate()
 const getUser=async()=>{
  const navigate = useNavigate()
  const getUser = async()={
     try{

        const response = await axios.post('http://localhost:5500/userDetails',{})
     }
     catch(error){




     }


  }

}

   useEffect(() => {
      if(!user) {
         getUser()
      }

   }, [user]);


    if(localStorage.getItem("token")){
        return props.children
    }else{
         return <Navigate to="/login" />;
    }
   
}

export default ProtectedRoute;
*/
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { reloadUserData, setUser } from "../redux/userSlice";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function ProtectedRoute(props) {
  const { user,reloadUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post(
        "http://localhost:5500/userDetails",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        dispatch(reloadUserData(false))
      } else {
        localStorage.clear()
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear()
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user || reloadUser) {
      getUser();
    }
  }, [user,reloadUser]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
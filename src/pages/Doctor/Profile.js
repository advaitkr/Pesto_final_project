import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ExpertForm from "../../components/ExpertForm";
import moment from "moment";
function Profile(){
const { user } = useSelector((state) => state.user);
const params = useParams();
const [expert, setExpert] = useState(null);
const dispatch = useDispatch();
const navigate = useNavigate();
const onFinish = async (values) => {

    try {
        
          dispatch(showLoading())
          const response = await axios.post('/update-expert-profile', {
              ...values,
              userId: user._Id,
              timings: [
                  moment(values.timings[0]).format("HH:mm"),
                  moment(values.timings[1]).format("HH:mm"),
              ]
          }, {

              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
              },

          })
          dispatch(hideLoading())
          if (response.data.success) {
              toast.success(response.data.message)
              navigate("/")
          } else {
              toast.error(response.data.message)
          }
      } catch (error) {
          dispatch(hideLoading())
          console.log(error.message)
          //console.log(response.data.message)
          toast.error("Something went wrong")
      }

  }
  const getExpertData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/get-expert-info-by-user-id",
        {
          userId:params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setExpert(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getExpertData();
  }, []);
  return (
     <Layout>
        <h1 className='page-title'>
        Expert Profile
        </h1>
      {expert && <ExpertForm onFinish={onFinish} initivalValues={expert} />}
     </Layout>

  )
}

export default Profile
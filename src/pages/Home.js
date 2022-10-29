//import { Layout } from 'antd';
import React,{ useEffect,useState} from 'react';
import Expert from '../components/Expert';
import Layout from "../components/Layout";
import { useDispatch} from 'react-redux'
import axios from 'axios'
import { Col, Row } from "antd";
import { hideLoading, showLoading } from '../redux/alertsSlice';
function Home() {
  const [experts, setExperts] = useState([])
  const dispatch = useDispatch();
    const getData = async()=>{
       try{
           dispatch(showLoading())
           const response = await axios.get('/get-all-approved-experts',{
            
             headers : {
                'Content-Type': 'application/json',
                'Authorization' : "Bearer " + localStorage.getItem('token')
             }

           })
           dispatch(hideLoading())
           if(response.data.success){
              console.log(response.data,"home_response")
              setExperts(response.data.data)
           }
       }catch(error){
        console.log(error)
        dispatch(hideLoading())
      }
     }
     useEffect(() => {
        getData();
      },[]);
    return (
      <Layout>
      <Row gutter={30}>
        {experts.map((expert) => (
          <Col span={8} xs={24} sm={24} lg={8}  key={expert.id}>
            <Expert expert={expert} />
          </Col>
        ))}
      </Row>
    </Layout>
   );
}

export default Home;
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { Table } from "antd";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import moment from "moment";
function ExpertsList() {
    const [experts, setExperts] = useState([])
    const dispatch = useDispatch();
    const getExpertsData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('http://localhost:5500/experts', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading());
            if (response.data.success) {
                console.log(response.data, "experts")
                setExperts(response.data.data)
            }

        } catch (error) {
            dispatch(hideLoading());
        }

    }
    const changeExpertStatus = async (record, status) => {
        try {
          dispatch(showLoading());
          const response = await axios.post(
            "/change-expert-account-status",
            { ExpertId: record._id, userId: record.userId, status: status },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (response.data.success) {
            //toast.success(response.data.message);
            console.log(response.data, "expert")
            getExpertsData()
          }
        } catch (error) {
            toast.error('Error changing expert account status'); 
          dispatch(hideLoading());
        }
      };
    useEffect(() => {
        getExpertsData()
    }, []);


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.firstName} {record.lastName}
                </span>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
          },
        {
            title: "status",
            dataIndex: "status",
        }, {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                   {record.status === 'pending' && 
                   <h1 className='anchor'
                   onClick={() => changeExpertStatus(record, "approved")}>Approve</h1>}
                   {record.status === 'approved' && 
                   <h1 className='anchor'
                   onClick={() => changeExpertStatus(record, "blocked")}>Block</h1>}
                </div>
            ),

        }
    ]

    return (
        <Layout>
            <h1 className='page-header'>Experts List</h1>
            <hr />
            <Table columns={columns} dataSource={experts} />
        </Layout>
    );
}

export default ExpertsList;
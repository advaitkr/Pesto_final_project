import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { Table } from "antd";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import moment from "moment";

function Appointments(props) {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
    const getAppointmentsData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('/get-appointments-by-user-id', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading());
            if (response.data.success) {
                console.log(response.data, "experts")
                setAppointments(response.data.data)
            }

        } catch (error) {
            dispatch(hideLoading());
        }

    }
    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
        },
        {
          title: "Expert",
          dataIndex: "name",
          render: (text, record) => (
            <span>
              {record.expertInfo.firstName} {record.expertInfo.lastName}
            </span>
          ),
        },
        {
          title: "Phone",
          dataIndex: "phoneNumber",
          render: (text, record) => (
            <span>
              {record.expertInfo.phoneNumber} 
            </span>
          ),
        },
        {
          title: "Date & Time",
          dataIndex: "createdAt",
          render: (text, record) => (
            <span>
              {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}
            </span>
          ),
        },
        {
            title: "Status",
            dataIndex: "status",
        }
      ];
    useEffect(() => {
        getAppointmentsData()
    }, []);
    return (
        <Layout>
  <h1 className="page-title">Appointments</h1>
  <hr />
  <Table columns={columns} dataSource={appointments} />
</Layout>
    );
}

export default Appointments;
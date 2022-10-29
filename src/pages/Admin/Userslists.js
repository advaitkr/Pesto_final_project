import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout'
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { Table } from "antd";
import axios from 'axios'

function Userslists() {
    const [users, setUsers] = useState([])
    const dispatch = useDispatch();
    const getUsersData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('http://localhost:5500/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading());
            if (response.data.success) {
                console.log(response.data)
                dispatch(setUsers(response.data.data));
            }

        } catch (error) {
            dispatch(hideLoading());

        }
    }


    useEffect(() => {
        getUsersData()
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email'
        }, {

            title: 'Created At',
            dataIndex: 'createdAt',
        }, {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
              <div className="d-flex">
                <h1 className="anchor">Block</h1>
              </div>
            ),

        }
    ]

    return (
        <Layout>
            <h1 className='page-header'>Users List</h1>
            <Table columns={columns} dataSource={users} />
        </Layout>
    );
}

export default Userslists;
import { Button, Table, message } from "antd";
import React, { useEffect } from "react";
// import ProductsForm from './ProductsForm'
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import moment from "moment";
import { GetAllUsers, UpdateUserStatus } from "../../apicalls/users";

function Users() {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllUsers(null);
      dispatch(setLoader(false));
      if (response.success) {
        console.log(response.data)
        setUsers(response.data);
      }
    } catch (error) {
        setUsers(error.message);
      message.error(error.message);
    }
  };
  const onStatusUpdate = async (id, status) => {
    try {
        dispatch(setLoader(true))
        const response = await UpdateUserStatus(id, status)
        dispatch(setLoader(false))
        if(response.success){
            message.success(response.message)
            getData()
        }else{
            throw new Error(response.message)
        }
    } catch (error) {
        dispatch(setLoader(false))
        message.error(error.message)
    }
  };

  const columns = [
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title: "Email",
        dataIndex: "email"
    },
    {
        title: "Created At",
        dataIndex: "createdAt",
        render: (text, record) => {
            return moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
        }
    },
    {
        title: "Role",
        dataIndex: "role",
        render: (text, record) => {
            return record.role.toUpperCase()
        }
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (text, record) => {
            return record.status.toUpperCase()
        }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "active" && (
              <span
                className="underline"
                onClick={() => onStatusUpdate(_id, "blocked")}>
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                className="underline"
                onClick={() => onStatusUpdate(_id, "active")}>
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-2"></div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
}

export default Users;

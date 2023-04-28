import { Button, Table, message } from "antd";
import React, { useEffect } from "react";
// import ProductsForm from './ProductsForm'
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import moment from "moment";
import { GetProducts, UpdateProductStatus } from "../../apicalls/products";

function Products() {
  const [products, setProducts] = React.useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(null);
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const onStatusUpdate = async (id, status) => {
    try {
        dispatch(setLoader(true))
        const response = await UpdateProductStatus(id, status)
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
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => record.status.toUpperCase()
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "pending" && (
              <span
                className="underline"
                onClick={() => onStatusUpdate(_id, "approved")}>
                Approve
              </span>
            )}
            {status === "pending" && (
              <span
                className="underline"
                onClick={() => onStatusUpdate(_id, "rejected")}>
                Reject
              </span>
            )}
            {status === "approved" && (
              <span
                className="underline"
                onClick={() => onStatusUpdate(_id, "blocked")}>
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                className="underline"
                onClick={() => onStatusUpdate(_id, "approved")}>
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
      <div className="flex justify-end mb-2 z-[100]"></div>
      <Table columns={columns} dataSource={products} />
    </div>
  );
}

export default Products;

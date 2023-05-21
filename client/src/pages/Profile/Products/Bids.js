import { Divider, Modal, Table, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoader } from '../../../redux/loaderSlice'
import { getAllBids } from '../../../apicalls/products'
import moment from 'moment'

function Bids({
    showBidsModal,
    setShowBidsModal,
    selectedProduct,
}) {
    const [ bidsData, setBidsData ] = React.useState([])
    const dispatch = useDispatch()
    const columns = [
      {
        title:"Name",
        dataIndex:"name",
        render: (text, record)=> record.buyer.name
      },
      {
        title:"Bid Amount",
        dataIndex:"bidAmount"
      },
      {
        title:"Bid Date",
        dataIndex: "createdAt",
        render: (text, record) => {
          return moment(text).format("DD-MM-YYYY hh:mm a")
        }
      },
      {
        title:"Message",
        dataIndex: "message"
      },
      {
        title:"Contact Details",
        dataIndex:"contactDetails",
        render: (text, record) => {
          return(
            <div>
              <p>Phone : {record.mobile}</p>
              <p>Email : {record.buyer.email}</p>
            </div>
          )
        }
      }
    ]
    const getData = async () => {
      try {
        dispatch(setLoader(true))
        const response = await getAllBids({
          product: selectedProduct._id,
        })
        dispatch(setLoader(false))
        if (response.success) {
          setBidsData(response.data)
        }
      } catch (error) {
        dispatch(setLoader(false))
        message.error(error.message)
      }
    }
    useEffect(()=>{
      if(selectedProduct)
      {
        getData();
      }
    }, [selectedProduct])
  return (
    <Modal
    title=""
    open={showBidsModal}
    onCancel={() => setShowBidsModal(false)}
    centered
    width={1500}
    footer={null}
    >
      <div className='flex gap-3 flex-col'>
        <h1 className='text-primary'>Bids</h1>
        <Divider/>
        <h1 className='text-xl text-gray-500'>
          Produc Name : {selectedProduct.name}
        </h1>
      </div>

      <Table columns={columns} dataSource={bidsData}></Table>
    </Modal>
  )
}

export default Bids
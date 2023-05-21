import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
import ProductsForm from './ProductsForm'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../redux/loaderSlice'
import moment from 'moment'
import { DeleteProduct, GetProducts } from '../../../apicalls/products'
import Bids from './Bids'

function Products() {
    const [showBids, setShowBids ] = React.useState(false)
    const [ selectedProduct, setSelectedProduct ] = React.useState(null)
    const [ showProductForm, setShowProductForm ] = React.useState(false)
    const [products , setProducts] = React.useState([]);
    const { user } = useSelector((state) => state.users) 
    const dispatch = useDispatch()
    const getData = async()=>{
        try {
            dispatch(setLoader(true))
            console.log("id is",user._id)
            const response = await GetProducts({
                seller: user._id
            })
            console.log("products are ", response)
            dispatch(setLoader(false))
            if(response.success){
                setProducts(response.data)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    
    const deleteProduct = async (id) => {
        try {
            dispatch(setLoader(true))
            const response = await DeleteProduct(id)
            dispatch(setLoader(false))
            if(response.success){
                message.success(response.message)
                getData()
            }
            else{
                message.error(response.message)
            }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message)
        }
    }
    const columns = [
        {
            title:"Name",
            dataIndex:"name",
        },
        {
            title:"Description",
            dataIndex:"description",
        },
        {
            title:"Price",
            dataIndex:"price",
        },
        {
            title:"Category",
            dataIndex:"category",
        },
        {
            title:"Status",
            dataIndex:"status",
        },
        {
            title:"Added On",
            dataIndex:"createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
            
        },
        
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return(
                    <div className='flex gap-5 items-center'>
                        <i className='ri-delete-bin-line'
                        onClick={()=>{
                            deleteProduct(record._id)
                        }}></i>
                        <i className='ri-pencil-line'
                        onClick={() => {
                            setSelectedProduct(record)
                            setShowProductForm(true)
                        }}
                        ></i>
                        <span 
                        className='underline cursor-pointer'
                        onClick={()=>{
                            setSelectedProduct(record);
                            setShowBids(true);
                        }}
                        >Show Bids
                        </span>
                    </div>
                )
            }
        },
    ]

    

    useEffect(()=>{
        getData()
    },[])

    return (
    <div>
        <div className='flex justify-end mb-2'>
            <Button
            type='default'
            onClick={() => {
                setShowProductForm(true)
                setSelectedProduct(null)
            }}
            >Add Products</Button>
        </div>
        <Table columns={ columns } dataSource={ products } />
        { showProductForm && 
        (<ProductsForm 
        showProductForm = { showProductForm } 
        setShowProductForm = { setShowProductForm } 
        selectedProduct={selectedProduct}
        getData = {getData}
        />)}
        
        {showBids &&(
            <Bids 
            showBidsModal={showBids}
            setShowBidsModal={setShowBids}
            selectedProduct={selectedProduct}
            />
        )}
        
    </div>
  )
}

export default Products
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/loaderSlice'
import { GetProducts } from '../../apicalls/products'
import { Divider, message } from 'antd'
import { useNavigate } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [products, setProducts] = React.useState([])
  const [ filters, setFilters ] = React.useState({
    status: 'approved',
  })
  const { user } = useSelector((state) => state.users)

  const getData = async () => {
    try {
      dispatch(setLoader(true))
      const response = await GetProducts(null)
      dispatch(setLoader(false))
      if(response.success){
        setProducts(response.data)
      }else{
        throw new Error(response.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <div className='grid grid-cols-4 gap-2'>
      {
        products.map((product) => {
          return <div 
          className='border border-gray-300 rounded border-solid flex flex-col gap-5 pb-2 cursor-pointer'
          key={product._id}
          onClick={()=>{navigate(`/product/${product._id}`)}}
          >
            <img 
            src={product.images[0]}
            className='w-full h-40 object-cover'
            alt=''
            />
            <div className='px-2 flex flex-col gap-2'>
              <h1 className='text-lg font-semibold'>{product.name}</h1>
              <p className='text-sm'>{product.description}</p>
              <Divider />
              <span className='text-xl font-semibold text-green-700'>
                $ {product.price}
              </span>
            </div>
          </div>
        })
      }
      </div>
    </div>
  )
}

export default Home
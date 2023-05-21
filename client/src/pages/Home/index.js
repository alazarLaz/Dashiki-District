import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/loaderSlice'
import { GetProducts } from '../../apicalls/products'
import { Divider, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import Filters from './Filters'

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ showFilters, setShowFilters ] = React.useState(true)
  const [products, setProducts] = React.useState([])
  const [ filters, setFilters ] = React.useState({
    status: 'approved',
    category: [],
    price: [],
  })
  const { user } = useSelector((state) => state.users)

  const getData = async () => {
    try {
      dispatch(setLoader(true))
      const response = await GetProducts(filters)
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
  }, [filters])
  return (
    <div className='flex gap-5'>
      { showFilters && (<Filters
      showFilters={showFilters}
      setShowFilters={setShowFilters}
      filters={filters}
      setFilters={setFilters}
      />)}
      <div className='flex flex-col gap-5 w-full '> 
      <div className='flex gap-5 items-center'>
        {!showFilters && <i className='ri-equalizer-line text-xl' onClick={
          ()=>setShowFilters(!showFilters)
        }></i>}
        <input 
        type='text'
        placeholder='Search Products here....'
        // className='border border-gray-300 rounded border-solid w-full p-2 h-14'
        // style={{width: 30}}
        />
      </div>
      <div className={`
      grid gap-5 ${showFilters ? "grid-cols-4":"grid-cols-5"} 
      `}>
      {
        products.map((product) => {
          return <div 
          className='border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer'
          key={product._id}
          onClick={()=>{navigate(`/product/${product._id}`)}}
          >
            <img 
            src={product.images[0]}
            className='w-full h-52 p-5 rounded-md object-cover'
            alt=''
            />
            <div className='px-2 flex flex-col'>
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
    </div>
  )
}

export default Home
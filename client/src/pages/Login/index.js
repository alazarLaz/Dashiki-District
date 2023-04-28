import React, { useEffect } from 'react'
import { Button, Form, message } from 'antd'
import Input from 'antd/es/input/Input'
import { Link, useNavigate } from 'react-router-dom'
import Divider from '../../components/Divider'
import { LoginUser } from '../../apicalls/users'
import { useDispatch } from 'react-redux'
import { setLoader } from '../../redux/loaderSlice'


const rules = [
  {
    required: true,
    message: 'required'
  }
]
function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true))
      const response = await LoginUser(values)
      dispatch(setLoader(false))
      if(response.success){
        message.success(response.message)
        localStorage.setItem("token", response.data)
        window.location.href = "/"
      }else{
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message)
      console.log(error.message)
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/")
    }
  },[navigate])
  return (
    <div
    className='h-screen bg-primary flex justify-center items-center'>
      <div className='bg-white p-5 rounded w-[450px]'>
        <div className='text-primary text-2xl'>Dishiki District 
        <span className='text-gray-400'> - LOGIN</span> </div>
        <Divider/>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item
          rules = {rules}
          label='Email'
          name='email'
          >
            <Input placeholder='Email'/>
          </Form.Item>
          <Form.Item
          rules = {rules}
          label='Password'
          name='password'
          >
            <Input type='password' placeholder='Password'/>
          </Form.Item>
          <Button className='mt-5' type='primary' htmlType='submit' block>Login</Button>
          <div className='mt-5 text-center'>
          <span className='text-gray-500'>
            Already have an account? <Link 
            className='text-primary' 
            to='/register'>register</Link>
          </span>
          </div>
        </Form>
      </div>
      </div>
  )
}

export default Login;
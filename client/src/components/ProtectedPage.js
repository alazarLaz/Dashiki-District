import { message } from "antd";
import React, { useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loaderSlice";
import { setUser } from "../redux/usersSlice";

function ProtectedPage({ children }) {
  const { user } = useSelector((state) => state.users)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const validateToken = async () => {
    try {
      dispatch(setLoader(true))
      const response = await GetCurrentUser();
      dispatch(setLoader(false))
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        message.error(response.message)
        console.log(response.message)
      }
    } catch (error) {
      message.error(error.message);
      console.log(error.message)
    //   navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login")
    }
  }, []);
  return user && (<>
        {/*header*/}
        <div className="flex justify-between item-center bg-primary p-5">
            <h1 className="text-2xl text-white cursor-pointer" onClick={()=>navigate("/")}>Dishiki District</h1>
            <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
                <i className="ri-shield-user-line"></i>
                <span className="underline cursor-pointer uppercase" 
                onClick={() => {
                  if(user.role === 'user'){
                    navigate("/profile")
                  }else{
                    navigate("/admin")
                  }
                }
                }
                >{user.name}</span>
                <i className="ri-logout-box-r-line ml-10"
                onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/login")
                }}
                ></i>
            </div>

        </div>
        {/*body*/}
    <div>
        <div className="p-5"> {children} </div>
    </div>
    </>
  );
}

export default ProtectedPage;

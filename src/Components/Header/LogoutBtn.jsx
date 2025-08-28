import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout } from '../../store/authslice'
import { logoutUser } from '../../Services/authServices/authapi'

export function LogoutBtn() {
    const dispatch = useDispatch()
     const navigate = useNavigate()
    const logoutHandler = async ()=> {
        try {
            await logoutUser();
            dispatch(logout());
        } catch (error) {
            console.error("Logout Error:", error);
            alert(error.message || "Something went wrong!");
        }finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userId");
            navigate('/')
        }


        
        // navigate('/login')

    }    

    return <button onClick={logoutHandler} className='inline-bock px-4 py-2 bg-yellow-300 text-black rounded-full font-semibold shadow hover:bg-white hover:text-purple-700 transition'>Logout</button>
}
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const useGetMongoData = () => {
    const [info,setInfo]=useState([])
    const {user}=useContext(AuthContext);
    const userEmail=user?.email;
    useEffect(()=>{
        const getOrders = async () => {
         await fetch('http://localhost:5000/allorder')
        .then(res=>res.json())
        .then(data => setInfo(data))
        }
        getOrders()
    },[info])

    return {info};
};

export default useGetMongoData;
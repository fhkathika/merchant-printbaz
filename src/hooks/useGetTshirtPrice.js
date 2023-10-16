
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const useGetTshirtPrice = () => {
    const [tshirtPrice,setTshirtPrice]=useState([])
    useEffect(()=>{
        const getPrices = async () => {
         await fetch(`https://mserver.printbaz.com/getTshirtPrice`) //for main site
        //  await fetch('http://localhost:5000/getTshirtPrice') //for testing site
        .then(res=>res.json())
        .then(data => setTshirtPrice(data))
       
        }
        getPrices()
    },[tshirtPrice])
    return {tshirtPrice};
};

export default useGetTshirtPrice;
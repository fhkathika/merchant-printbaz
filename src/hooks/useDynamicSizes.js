
import React, { useContext, useEffect, useState } from 'react';


const useDynamicSizes = () => {
    const [sizeData,setSizeData]=useState([])

    useEffect(()=>{
    
    const getSizeStock = async () => {
      // await fetch("http://localhost:5000/getAllSize") 
      await fetch("https://mserver.printbaz.com/getAllSize") 
     .then(res=>res.json())
     .then(data => setSizeData(data))
     }
     getSizeStock()
    },[])
    return {sizeData};
};

export default useDynamicSizes;


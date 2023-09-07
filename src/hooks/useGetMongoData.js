import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const useGetMongoData = () => {
    const [info,setInfo]=useState([])
    const {user}=useContext(AuthContext);
    const userEmail=user?.email;
    useEffect(()=>{
        const getOrders = async () => {
         await fetch('https://mserver.printbaz.com/allorder') //for main site
        //  await fetch('http://localhost:5000/allorder') //for testing site
        .then(res=>res.json())
        .then(data => setInfo(data))
        }
        getOrders()
    },[info])

    return {info};
};

export default useGetMongoData;

// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthProvider/AuthProvider';

// const useGetMongoData = () => {
//   const [info, setInfo] = useState([]);
//   const { user } = useContext(AuthContext);
//   const userEmail = user?.email;
//   console.log("userEmail",userEmail);

//   useEffect(() => {
//     const getOrders = async () => {
//       try {// for main site 
//         // const response = await fetch(`https://mserver.printbaz.com/getmyorder/${userEmail}`);

//         //for testing site
//         const response = await fetch(`https://localhost:5000/getmyorder/${userEmail}`);
//         if (response.ok) {
//           const data = await response.json();
//           setInfo(data);
//         } else {
//           console.error('Failed to fetch orders');
//         }
//       } catch (error) {
//         console.error('Failed to fetch orders',error.message);
//       }
//     };

//     if (userEmail) {
//       getOrders();
//     }
//   }, [userEmail]);

//   return { info };
// };

// export default useGetMongoData;

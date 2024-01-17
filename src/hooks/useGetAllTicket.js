
import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';

const useGetAllTicket = () => {
    const[fetchAllTicket,setFetchAllTicket]=useState([])

    useEffect(() => {
        const fetchAllTicketData = async () => {
          try {
            const response = await axios.get('https://mserver.printbaz.com/allTicketIds');
            setFetchAllTicket(response.data);
      
            // Store the data in local storage
            localStorage.setItem('fetchAllTicketData', JSON.stringify(response.data));
          } catch (err) {
            console.error(err);
          }
        };
      
        fetchAllTicketData();
      }, []);
      
    return {fetchAllTicket};
};

export default useGetAllTicket;


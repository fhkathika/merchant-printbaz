import { doc, getDoc, collection } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";

export const useGetData = (id, collections,lData) => {
  const [fetchedData, setfetchedData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchProduct, setSearchProduct] = useState([]);
  
  //   get data
  useEffect(() => {
    const getTshirts = async () => {
      const docRef = doc(db, collections, id);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        const data = docSnap.data();
        //  setTimeout(() => setfetchedData([data, Math.random()]), 2000);
       setfetchedData(data);
       setSearchProduct(data);
       setLastUpdated(docSnap.data().lastUpdated || {});
      }else{
        console.log("no data found");
      }
     
    };
    getTshirts();
  }, [lData ]);

  return { fetchedData ,lastUpdated,setLastUpdated,searchProduct,setSearchProduct};
};

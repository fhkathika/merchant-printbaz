import { useEffect, useState } from "react";
import dataD from "./data";

export const useFormulae = (productName) => {
  const [formulaeData, setFormulae] = useState();
  useEffect(() => {
    const fetchData = async () => {
      let fileName = `${productName}.json`;
      let data = await dataD(fileName);

      setFormulae(data);
    };
    fetchData();
  }, [productName]);

  return formulaeData;
};

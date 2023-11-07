import { useState, useEffect } from 'react';
import useGetTshirtPrice from './useGetTshirtPrice';

// Custom Hook
const useDynamicBckSidePrice = () => {
  const [dynamicBackPrices, setDynamicBackPrices] = useState({});
  const { tshirtPrice } = useGetTshirtPrice();

  useEffect(() => {
    const prices = {};
    tshirtPrice?.forEach(product => {
      // Replace " x " with "x", remove spaces, and replace "." with "p"
      const size = product.printSizeBack
        ?.replace(/ x /g, 'x')
        .replace(/\s+/g, '')
        .replace(/\./g, 'p') 
        .replace(/[()]/g, ''); // This will remove parentheses
      prices[`backSideDtfprice_${size}`] = product.backSideprice;
    });
    setDynamicBackPrices(prices);
  }, [tshirtPrice]); // Only re-run the effect if tshirtPrice changes

  return { dynamicBackPrices };
}

export default useDynamicBckSidePrice;


import { useState, useEffect } from 'react';
import useGetTshirtPrice from './useGetTshirtPrice';

// Custom Hook
const useDynamicFrontSidePrice = () => {
  const [dynamicFrontPrices, setDynamicFrontPrices] = useState({});
  const { tshirtPrice } = useGetTshirtPrice();

  useEffect(() => {
    const prices = {};
    tshirtPrice?.forEach(product => {
      // Replace " x " with "x", remove spaces, and replace "." with "p"
      const size = product.printSizeFront
        ?.replace(/ x /g, 'x')
        .replace(/\s+/g, '')
        .replace(/\./g, 'p') 
        .replace(/[()]/g, ''); // This will remove parentheses
      prices[`frontSideprice_${size}`] = product.frontSideprice;
    });
    setDynamicFrontPrices(prices);
  }, [tshirtPrice]); // Only re-run the effect if tshirtPrice changes

  return { dynamicFrontPrices };
}

export default useDynamicFrontSidePrice;

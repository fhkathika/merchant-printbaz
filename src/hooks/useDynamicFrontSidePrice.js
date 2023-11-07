import { useState, useEffect } from 'react';
import useGetTshirtPrice from './useGetTshirtPrice';

// Custom Hook
const useDynamicFrontSidePrice = () => {
  const [dynamicFrontPrices, setDynamicFrontPrices] = useState({});
  const { tshirtPrice } = useGetTshirtPrice();
  
  console.log("tshirtPrice from useDynamicFrontSidePrice", tshirtPrice);

  useEffect(() => {
    const prices = {};
    tshirtPrice?.forEach(fSize => {
      if (fSize?.printSizeFront && fSize?.frontSideprice) {
        // Ensure that the size string is in the correct format
        const size = fSize.printSizeFront
          .replace(/ x /gi, 'x')
          .replace(/\s+/g, '')
          .replace(/\./g, 'p')
          .replace(/[()]/g, ''); // Remove parentheses

        // Convert the price to a number
        const price = parseInt(fSize.frontSideprice, 10);

        // Check if the price is a valid number before assigning
        if (!isNaN(price)) {
          prices[`frontSideprice_${size}`] = price;
        }
      }
    });

    setDynamicFrontPrices(prices);
  }, [tshirtPrice]); // Only re-run the effect if tshirtPrice changes

  return { dynamicFrontPrices };
}

export default useDynamicFrontSidePrice;

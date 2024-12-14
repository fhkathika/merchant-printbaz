import React from 'react';

const teeShirtFormula = (
    quantity,
    totalQuantity,
    printSize,
    price_11p7x16p5,
    price_10x14,
    price_10x10,
    price_10x5,
    price_5X5,
    price_2p5X5,
    price_2p5X2p5,
   
    ) => {
        const safeParseInt = (str) => {
            const value = parseInt(str);
            return isNaN(value) ? 0 : value;
        };
let selectedSizes = [];    
let totalPrice=0
let totalPrice11p7x16p5=0
let totalPrice10x14=0
let totalPrice10x10=0
let totalPrice10x5=0
let totalPrice5X5=0
let totalPrice2p5X5=0
let totalPrice2p5X2p5=0
 // 10 x 14
 // 10 x 14
    if(printSize==="11.7 x 16.5"){
      
        totalPrice11p7x16p5=safeParseInt(totalQuantity*price_11p7x16p5);

} 
    if(printSize==="10 x 14"){
      
        totalPrice10x14=safeParseInt(totalQuantity*price_10x14);

} 
// 10 x 10
if(printSize==="10 x 10"){

    totalPrice10x10=safeParseInt(totalQuantity*price_10x10);

} 
// 10x5
if(printSize==="10 x 5"){
 
    totalPrice10x5=safeParseInt(totalQuantity*price_10x5);

} 

if(printSize==="5 X 5"){
 
    totalPrice5X5=safeParseInt(totalQuantity*price_5X5);

} 

if(printSize==="2.5 X 5"){
   
    totalPrice2p5X5=safeParseInt(totalQuantity*price_2p5X5);

}if(printSize==="2.5 X 2.5"){
   
    totalPrice2p5X2p5=safeParseInt(totalQuantity*price_2p5X2p5);

}
totalPrice=
totalPrice11p7x16p5+
totalPrice10x14+
totalPrice10x10+
totalPrice10x5+
totalPrice5X5+
totalPrice2p5X5+
totalPrice2p5X2p5

const uPrice = totalPrice / quantity;
let unitPrice = 0;
if (uPrice % 1 === 0) {
  unitPrice = uPrice;
} else if (uPrice % 1 !== 0) {
  unitPrice = parseFloat(uPrice).toFixed(2);
}
  
  return ({ totalPrice: totalPrice ,unitPrice: unitPrice });
};

export default teeShirtFormula;
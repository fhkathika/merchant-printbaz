import React from 'react';

const teeShirtFormula = (quantity,
    printSize,
    price1to9_10x14,
    price10to19_10x14,
    price20to29_10x14,
    price30to40_10x14,
    price41to49_10x14,
    price50Plus_10x14,
    price1to9_10x10,
    price10to19_10x10,
    price20to29_10x10,
    price30to40_10x10,
    price41to49_10x10,
    price50Plus_10x10,
    price1to9_10x5,
    price10to19_10x5,
    price20to29_10x5,
    price30to40_10x5,
    price41to49_10x5,
    price50Plus_10x5,
    price1to9_5X5,
    price10to19_5X5,
    price20to29_5X5,
    price30to40_5X5,
    price41to49_5X5,
    price50Plus_5X5,
    price1to9_2p5X5,
    price10to19_2p5X5,
    price20to29_2p5X5,
    price30to40_2p5X5,
    price41to49_2p5X5,
    price50Plus_2p5X5
    ) => {
let totalPrice=0
// 10 x 14
    if(printSize==="10 x 14" && (quantity>=1 && quantity <=9)){
        totalPrice=quantity*price1to9_10x14;

}  else if(printSize==="10 x 14" && (quantity>=10 && quantity <=19)){
    totalPrice=quantity*price10to19_10x14;
        
} else if(printSize==="10 x 14" && (quantity>=20 && quantity <=29)){
    totalPrice=quantity*price20to29_10x14;
        
} else if(printSize==="10 x 14" && (quantity>=30 && quantity <=40)){
    totalPrice=quantity*price30to40_10x14;
        
} else if(printSize==="10 x 14" && (quantity>=41 && quantity <=49)){
    totalPrice=quantity*price41to49_10x14;
        
} else if(printSize==="10 x 14" && (quantity>=50)){
    totalPrice=quantity*price50Plus_10x14;
        
} 
// 10 x 10
if(printSize==="10 x 10" && (quantity>=1 && quantity <=9)){
    totalPrice=quantity*price1to9_10x10;

}  else if(printSize==="10 x 10" && (quantity>=10 && quantity <=19)){
    totalPrice=quantity*price10to19_10x10;
        
} else if(printSize==="10 x 10" && (quantity>=20 && quantity <=29)){
    totalPrice=quantity*price20to29_10x10;
        
} else if(printSize==="10 x 10" && (quantity>=30 && quantity <=40)){
    totalPrice=quantity*price30to40_10x10;
        
} else if(printSize==="10 x 10" && (quantity>=41 && quantity <=49)){
    totalPrice=quantity*price41to49_10x10;
        
} else if(printSize==="10 x 10" && (quantity>=50)){
    totalPrice=quantity*price50Plus_10x10;
        
}
// 10x5
if(printSize==="10 x 5" && (quantity>=1 && quantity <=9)){
    totalPrice=quantity*price1to9_10x5;

}  else if(printSize==="10 x 5" && (quantity>=10 && quantity <=19)){
    totalPrice=quantity*price10to19_10x5;
        
} else if(printSize==="10 x 5" && (quantity>=20 && quantity <=29)){
    totalPrice=quantity*price20to29_10x5;
        
} else if(printSize==="10 x 5" && (quantity>=30 && quantity <=40)){
    totalPrice=quantity*price30to40_10x5;
        
} else if(printSize==="10 x 5" && (quantity>=41 && quantity <=49)){
    totalPrice=quantity*price41to49_10x5;
        
} else if(printSize==="10 x 5" && (quantity>=50)){
    totalPrice=quantity*price50Plus_10x5;
        
}

if(printSize==="5 X 5" && (quantity>=1 && quantity <=9)){
    totalPrice=quantity*price1to9_5X5;

}  else if(printSize==="5 X 5" && (quantity>=10 && quantity <=19)){
    totalPrice=quantity*price10to19_5X5;
        
} else if(printSize==="5 X 5" && (quantity>=20 && quantity <=29)){
    totalPrice=quantity*price20to29_5X5;
        
} else if(printSize==="5 X 5" && (quantity>=30 && quantity <=40)){
    totalPrice=quantity*price30to40_5X5;
        
} else if(printSize==="5 X 5" && (quantity>=41 && quantity <=49)){
    totalPrice=quantity*price41to49_5X5;
        
} else if(printSize==="5 X 5" && (quantity>=50)){
    totalPrice=quantity*price50Plus_5X5;
        
}

if(printSize==="2.5 X 5" && (quantity>=1 && quantity <=9)){
    totalPrice=quantity*price1to9_2p5X5;

}  else if(printSize==="2.5 X 5" && (quantity>=10 && quantity <=19)){
    totalPrice=quantity*price10to19_2p5X5;
        
} else if(printSize==="2.5 X 5" && (quantity>=20 && quantity <=29)){
    totalPrice=quantity*price20to29_2p5X5;
        
} else if(printSize==="2.5 X 5" && (quantity>=30 && quantity <=40)){
    totalPrice=quantity*price30to40_2p5X5;
        
} else if(printSize==="2.5 X 5" && (quantity>=41 && quantity <=49)){
    totalPrice=quantity*price41to49_2p5X5;
        
} else if(printSize==="2.5 X 5" && (quantity>=50)){
    totalPrice=quantity*price50Plus_2p5X5;
        
}
console.log("price1to9_5X5...",price1to9_5X5);
console.log("price10to19_5X5",price10to19_5X5);
console.log("price20to29_5X5",price20to29_5X5);
console.log("price30to40_5X5",price30to40_5X5);
console.log("price41to49_5X5",price41to49_5X5);
console.log("price50Plus_5X5",price50Plus_5X5);
console.log("price1to9_2p5X5",price1to9_2p5X5);
console.log("price10to19_2p5X5",price10to19_2p5X5);
console.log("price20to29_2p5X5",price20to29_2p5X5);
console.log("price30to40_2p5X5",price30to40_2p5X5);
console.log("price41to49_2p5X5",price41to49_2p5X5);
console.log("price50Plus_2p5X5",price50Plus_2p5X5);

const uPrice = totalPrice / quantity;
let unitPrice = 0;
if (uPrice % 1 === 0) {
  unitPrice = uPrice;
  console.log("unitPrice", unitPrice);
} else if (uPrice % 1 !== 0) {
  unitPrice = parseFloat(uPrice).toFixed(2);
  console.log("unitPrice floating point", unitPrice);
}
    
  return ({ totalPrice: totalPrice ,unitPrice: unitPrice });
};

export default teeShirtFormula;
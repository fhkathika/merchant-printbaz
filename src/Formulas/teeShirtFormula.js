import React from 'react';
const teeShirtFormula = (quantity,
    printSize,
    printSizeBack,
    customRoundNeckFilter,
customDropSholderFilter,
customHoodieFilter,
blankRoundNeckFilter,
blankDropSholderFilter,
blankHoodieFilter,
selectProductType,
printSide
                                     
    ) => {
      console.log("printSize",printSize);
let totalPrice=0
const customRoundNeckinputFilter=customRoundNeckFilter?.find(thsirt => thsirt.printSizeFront === printSize)
const customRoundNeckBackinputFilter=customRoundNeckFilter?.find(thsirt => thsirt.printSizeBack === printSizeBack)

const customDropSholderinputFilter=customDropSholderFilter?.find(thsirt => thsirt.printSizeFront === printSize)
const customDropSholderBackinputFilter=customDropSholderFilter?.find(thsirt => thsirt.printSizeBack === printSizeBack)

const cusftomHoodieinputFilter=customHoodieFilter?.find(thsirt => thsirt.printSizeFront === printSize)
const cusftomHoodieBackinputFilter=customHoodieFilter?.find(thsirt => thsirt.printSizeBack === printSizeBack)
console.log("customRoundNeckinputFilter",customRoundNeckinputFilter);
if(selectProductType==="Round Neck"){ 
   if( printSide==="frontSide" || printSide==="backSide"){
  // 10 x 14
  totalPrice=quantity*customRoundNeckinputFilter?.frontSideprice;
 
   }
   else if( printSide==="bothSide"){
  // 10 x 14
  totalPrice=quantity*(customRoundNeckinputFilter?.frontSideprice+customRoundNeckBackinputFilter?.backSideprice);
 
   }
  
}
if( selectProductType==="Hoodie"){ 
    if( printSide==="frontSide"|| printSide==="backSide"){
  // 10 x 14
  totalPrice=quantity*cusftomHoodieinputFilter?.frontSideprice;
       
 
    } else if( printSide==="bothSide"){
        // 10 x 14
    totalPrice=quantity*(cusftomHoodieinputFilter?.frontSideprice+customDropSholderBackinputFilter?.backSideprice);
       
   
    }
  
}
if( selectProductType==="Drop Sholder"){ 
    if( printSide==="frontSide"|| printSide==="backSide"){
  // 10 x 14
  totalPrice=quantity*customDropSholderinputFilter?.frontSideprice;
 
    }
    else if ( printSide==="bothSide"){
        totalPrice=quantity*(customDropSholderinputFilter?.frontSideprice+cusftomHoodieBackinputFilter?.backSideprice);
    }
  
}


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
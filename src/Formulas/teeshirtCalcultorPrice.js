
import React from 'react';
import useGetTshirtPrice from '../hooks/useGetTshirtPrice';
const teeshirtCalcultorPrice = (quantity,
  printSize,
  printSizeBack,
  customRoundNeckFilter,
  customDropSholderFilter,
  customHoodieFilter,
  blankRoundNeckFilter,
  blankDropSholderFilter,
  blankHoodieFilter,
  selectProductType,
  printSide,
  tshirtPrice
                                     
    ) => {
      console.log("printSize",printSize);
    
   // blank product filter 
const blankRoundNeckFilters=tshirtPrice?.find(thsirt => thsirt.category === "Blank Round Neck")
const blankDropSholderFilters=tshirtPrice?.find(thsirt => thsirt.category === "Blank Drop Sholder")
const blankHoodieFilters=tshirtPrice?.find(thsirt => thsirt.category === "Blank Hoodie")
console.log("blankRoundNeckFilters",blankRoundNeckFilters)
let totalPrice=0
const customRoundNeckinputFrontFilter=customRoundNeckFilter?.find(thsirt => thsirt.printSizeFront === printSize)

const customRoundNeckBackinputFilter=customRoundNeckFilter?.find(thsirt => thsirt.printSizeBack === printSizeBack)

const customDropSholderFrontinputFilter=customDropSholderFilter?.find(thsirt => thsirt.printSizeFront === printSize)
const customDropSholderBackinputFilter=customDropSholderFilter?.find(thsirt => thsirt.printSizeBack === printSizeBack)

const cusftomHoodieinputfrontFilter=customHoodieFilter?.find(thsirt => thsirt.printSizeFront === printSize)
const cusftomHoodieBackinputFilter=customHoodieFilter?.find(thsirt => thsirt.printSizeBack === printSizeBack)
if(selectProductType==="Round Neck"){ 
   if( printSide==="frontSide" || printSide==="backSide"){
 totalPrice=quantity*Number(customRoundNeckinputFrontFilter?.frontSideprice);
 
   }
   else if( printSide==="bothSide"){
 
  totalPrice=quantity*(Number(customRoundNeckinputFrontFilter?.frontSideprice)+Number(customRoundNeckBackinputFilter?.backSideprice)+Number(customRoundNeckBackinputFilter?.additionalCost));
 
   }
  
}
if( selectProductType==="Hoodie"){ 
  console.log("hoodie")
    if( printSide==="frontSide"|| printSide==="backSide"){
 
  totalPrice=quantity*Number(cusftomHoodieinputfrontFilter?.frontSideprice);
       
 
    } else if( printSide==="bothSide"){
       
    totalPrice=quantity*(Number(cusftomHoodieinputfrontFilter?.frontSideprice)+Number(cusftomHoodieBackinputFilter?.backSideprice)+Number(cusftomHoodieBackinputFilter?.additionalCost));
     
   
    }
  
}
if( selectProductType==="Drop Sholder"){ 
  console.log("Drop sholder")
    if( printSide==="frontSide"|| printSide==="backSide"){
 
  totalPrice=quantity*Number(customDropSholderFrontinputFilter?.frontSideprice);
 
    }
    else if ( printSide==="bothSide"){
        totalPrice=quantity*(Number(customDropSholderFrontinputFilter?.frontSideprice)+Number(customDropSholderBackinputFilter?.backSideprice)+Number(customDropSholderBackinputFilter?.additionalCost));
    }
  
}

if(selectProductType==="Blank Round Neck"){
totalPrice=quantity*Number(blankRoundNeckFilters?.frontSideprice)
}
else if(selectProductType==="Blank Drop Sholder"){
totalPrice=quantity*Number(blankDropSholderFilters?.frontSideprice)
}
 else if(selectProductType==="Blank Hoodie"){
totalPrice=quantity*Number(blankHoodieFilters?.frontSideprice)
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

export default teeshirtCalcultorPrice;
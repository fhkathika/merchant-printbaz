
import React from 'react';
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
  printSide
                                     
    ) => {
      console.log("printSize",printSize);
let totalPrice=0
const customRoundNeckinputFilter=customRoundNeckFilter?.find(thsirt => thsirt.printSizeFront === printSize)
console.log("customRoundNeckinputFilter",customRoundNeckinputFilter)
const customRoundNeckBackinputFilter=customRoundNeckFilter?.find(thsirt => thsirt.printSizeBack === printSizeBack)

const customDropSholderinputFilter=customDropSholderFilter?.find(thsirt => thsirt.printSizeFront === printSize)
const customDropSholderBackinputFilter=customDropSholderFilter?.find(thsirt => thsirt.printSizeBack === printSizeBack)

const cusftomHoodieinputFilter=customHoodieFilter?.find(thsirt => thsirt.printSizeFront === printSize)
const cusftomHoodieBackinputFilter=customHoodieFilter?.find(thsirt => thsirt.printSizeBack === printSizeBack)
console.log("cusftomHoodieinputFilter from function",cusftomHoodieinputFilter);
if(selectProductType==="Round Neck"){ 
   if( printSide==="frontSide" || printSide==="backSide"){
 totalPrice=quantity*Number(customRoundNeckinputFilter?.frontSideprice);
 
   }
   else if( printSide==="bothSide"){
 
  totalPrice=quantity*(Number(customRoundNeckinputFilter?.frontSideprice)+Number(customRoundNeckBackinputFilter?.backSideprice)+Number(customRoundNeckBackinputFilter?.additionalCost));
 
   }
  
}
if( selectProductType==="Hoodie"){ 
    if( printSide==="frontSide"|| printSide==="backSide"){
 
  totalPrice=quantity*Number(cusftomHoodieinputFilter?.frontSideprice);
       
 
    } else if( printSide==="bothSide"){
       
    totalPrice=quantity*(Number(cusftomHoodieinputFilter?.frontSideprice)+Number(cusftomHoodieinputFilter?.backSideprice)+Number(cusftomHoodieinputFilter?.additionalCost));
       
   
    }
  
}
if( selectProductType==="Drop Sholder"){ 
    if( printSide==="frontSide"|| printSide==="backSide"){
 
  totalPrice=quantity*Number(customDropSholderinputFilter?.frontSideprice);
 
    }
    else if ( printSide==="bothSide"){
        totalPrice=quantity*(Number(customDropSholderinputFilter?.frontSideprice)+Number(customDropSholderBackinputFilter?.backSideprice)+Number(customDropSholderBackinputFilter?.additionalCost));
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

export default teeshirtCalcultorPrice;
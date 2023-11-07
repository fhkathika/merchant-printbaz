
import React from 'react';

const backsiideFormulaDropSholderHoodie = (
    quantity,
    totalQuantity,
    printSizeBack,
    printSide,
    backSideDtfprice_11p7x16p5,
    backSideDtfprice_10x14,
    backSideDtfprice_10x10,
    backSideDtfprice_10x5,
    backSideDtfprice_5X5,
    backSideDtfprice_2p5X5,
    backSideDtfprice_2p5X2p5,
    additionalCost,
   
    ) => {
        const safeParseInt = (str) => {
            const value = parseInt(str);
            return isNaN(value) ? 0 : value;
        };
let selectedSizes = [];    
let backDtfAndAdditionalCost=0
// let totalQuantity = formData?.orderDetailArr[i]?.totalQuantity;
// backSidePrintCost += totalQuantity * 130;
if(printSide==="bothSide" && printSizeBack==="11.7 x 16.5"){
    backDtfAndAdditionalCost=totalQuantity * safeParseInt(backSideDtfprice_11p7x16p5)+safeParseInt(additionalCost)
  } 
  if(printSide==="bothSide" && printSizeBack==="10 x 14" ){
    backDtfAndAdditionalCost= totalQuantity * safeParseInt(backSideDtfprice_10x14)+safeParseInt(additionalCost)
  }
  else if(printSide==="bothSide" &&printSizeBack==="10 x 10"){
    backDtfAndAdditionalCost=totalQuantity * safeParseInt(backSideDtfprice_10x10)+safeParseInt(additionalCost)
  } else if(printSide==="bothSide" &&printSizeBack==="10 x 5"){
    backDtfAndAdditionalCost= totalQuantity * safeParseInt(backSideDtfprice_10x5)+safeParseInt(additionalCost)
  } else if(printSide==="bothSide" && printSizeBack==="5 X 5"){
    backDtfAndAdditionalCost= totalQuantity * safeParseInt(backSideDtfprice_5X5)+safeParseInt(additionalCost)
  }
  else if(printSide==="bothSide" && printSizeBack==="2.5 X 5"){
    backDtfAndAdditionalCost= totalQuantity * safeParseInt(backSideDtfprice_2p5X5)+safeParseInt(additionalCost)
  }  else if(printSide==="bothSide" && printSizeBack==="2.5 X 2.5"){
    backDtfAndAdditionalCost= totalQuantity * safeParseInt(backSideDtfprice_2p5X2p5)+safeParseInt(additionalCost)
  }
 console.log("backDtfAndAdditionalCost",backDtfAndAdditionalCost);  
  return ({ backDtfAndAdditionalCost: backDtfAndAdditionalCost });
};

export default backsiideFormulaDropSholderHoodie;
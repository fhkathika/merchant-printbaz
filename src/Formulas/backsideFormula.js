
import React from 'react';

const backsideFormula = (
    quantity,
    totalQuantity,
    printSizeBack,
    printSide,
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
if(printSide==="bothSide" && printSizeBack==="10 x 14"){
    backDtfAndAdditionalCost+= totalQuantity * Number(backSideDtfprice_10x14)+Number(additionalCost)
}
else if(printSide==="bothSide" &&printSizeBack==="10 x 10"){
    backDtfAndAdditionalCost+= totalQuantity * Number(backSideDtfprice_10x10) +Number(additionalCost)
} else if(printSide==="bothSide" && printSizeBack==="10 x 5"){
    backDtfAndAdditionalCost+= totalQuantity * Number(backSideDtfprice_10x5)+Number(additionalCost)
} else if(printSide==="bothSide" && printSizeBack==="5 X 5"){
    backDtfAndAdditionalCost+=totalQuantity * Number(backSideDtfprice_5X5)+Number(additionalCost)
}
else if(printSide==="bothSide" && printSizeBack==="2.5 X 5"){
    backDtfAndAdditionalCost+= totalQuantity * Number(backSideDtfprice_2p5X5)+Number(additionalCost)
}
  else if(printSide==="bothSide" && printSizeBack==="2.5 X 2.5"){
    backDtfAndAdditionalCost+= totalQuantity * Number(backSideDtfprice_2p5X2p5)+Number(additionalCost)
}



  console.log("backDtfAndAdditionalCost",backDtfAndAdditionalCost);  
  return ({ backDtfAndAdditionalCost: backDtfAndAdditionalCost });
};

export default backsideFormula;
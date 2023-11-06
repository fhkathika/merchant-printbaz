
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
    backDtfAndAdditionalCost+= totalQuantity * backSideDtfprice_10x14+additionalCost
}
else if(printSide==="bothSide" &&printSizeBack==="10 x 10"){
    backDtfAndAdditionalCost+= totalQuantity * backSideDtfprice_10x10 +additionalCost
} else if(printSide==="bothSide" && printSizeBack==="10 x 5"){
    backDtfAndAdditionalCost+= totalQuantity * backSideDtfprice_10x5+additionalCost
} else if(printSide==="bothSide" && printSizeBack==="5 X 5"){
    backDtfAndAdditionalCost+=totalQuantity * backSideDtfprice_5X5+additionalCost
}
else if(printSide==="bothSide" && printSizeBack==="2.5 X 5"){
    backDtfAndAdditionalCost+= totalQuantity * backSideDtfprice_2p5X5+additionalCost
}
  else if(printSide==="bothSide" && printSizeBack==="2.5 X 2.5"){
    backDtfAndAdditionalCost+= totalQuantity * backSideDtfprice_2p5X2p5+additionalCost
}



  console.log("backDtfAndAdditionalCost",backDtfAndAdditionalCost);  
  return ({ backDtfAndAdditionalCost: backDtfAndAdditionalCost });
};

export default backsideFormula;
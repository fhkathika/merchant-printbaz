import React from 'react';

const deliveryCharge = ({
    grandQuantity,
    weightPerShirt,
    chargeForInSideZeroToP5,
    chargeForInSidep5To1,
    chargeForInSideoneTo2,
    chargeForInSidetwoTo3,
    chargeForOutSideZeroToP5,
    chargeForOutSidep5To1,
    chargeForOutSideoneTo2,
    chargeForOutSidetwoTo3,
    extraInSideDhakaChange,
    extraOutSideDhakaChange,
    deliveryAreas

}) => {
    // outsideDhaka insideDhaka 
    const safeParseInt = (str) => {
        const value = parseInt(str);
        return isNaN(value) ? 0 : value;
    };
    let deliveryFee=0;
    let total_weight=grandQuantity*weightPerShirt;
console.log("total_weight",total_weight);
    if(deliveryAreas==="outsideDhaka"){
    if(total_weight>=0 && total_weight<=0.5){
        deliveryFee=chargeForOutSideZeroToP5
    } 
    else if(total_weight>0.5 && total_weight<=1){
        deliveryFee=chargeForOutSidep5To1
    } 
    else if(total_weight>1 && total_weight<=2){
        deliveryFee=chargeForOutSideoneTo2
    } 
    else if(total_weight>2 && total_weight<=3){
        deliveryFee=chargeForOutSidetwoTo3
    } 
  else if (total_weight > 3) {
    const extraKgs = total_weight - 3; // Calculate the exact number of extra kilograms beyond 3 kg
    deliveryFee = chargeForOutSidetwoTo3 + (extraOutSideDhakaChange * Math.ceil(extraKgs)); // Add the extra charge for each extra kilogram, rounding up to the nearest whole kg
}

}
else{
    if(total_weight>=0 && total_weight<=0.5){
        deliveryFee=chargeForInSideZeroToP5
    } 
    else if(total_weight>0.5 && total_weight<=1){
        deliveryFee=chargeForInSidep5To1
    } 
    else if(total_weight>1 && total_weight<=2){
        deliveryFee=chargeForInSideoneTo2
    } 
    else if(total_weight>2 && total_weight<=3){
        deliveryFee=chargeForInSidetwoTo3
    } 
    else if (total_weight > 3) {
        const extraKgs = Math.ceil(total_weight - 3); // Calculate the number of extra kilograms beyond 3 kg
        deliveryFee = chargeForInSidetwoTo3 + (extraInSideDhakaChange * extraKgs); // Add the extra charge for each extra kilogram
    }
   
}
  return({deliveryFee:deliveryFee}) 
};

export default deliveryCharge;
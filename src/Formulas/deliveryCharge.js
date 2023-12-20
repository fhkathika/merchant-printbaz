import React from 'react';

const deliveryCharge = ({
    grandQuantity,
    weightPerShirt,
    weightPerHoodie,
    weightPerDropSholder,
    totalTshit,
    totalDropSholder,
    totalHoodie,
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
    let total_tshirt_weight=totalTshit*weightPerShirt;
    let total_Hoodie_weight=totalHoodie*weightPerHoodie;
    let total_DropSHolder_weight=totalDropSholder*weightPerDropSholder;
    let totalWeight=total_tshirt_weight+
    total_Hoodie_weight+
    total_DropSHolder_weight
    // let total_weight=grandQuantity*weightPerShirt;

console.log("total_tshirt_weight",total_tshirt_weight)
console.log("total_Hoodie_weight",total_Hoodie_weight)
console.log("total_DropSHolder_weight",total_DropSHolder_weight)
console.log("totalWeight",totalWeight)
    if(deliveryAreas==="outsideDhaka"){
     ///////////////round neck tshirt //////////////
    if(totalWeight>0 && totalWeight<=0.5){
        deliveryFee=chargeForOutSideZeroToP5
    } 
    else if(totalWeight>0.5 && totalWeight<=1){
        deliveryFee=chargeForOutSidep5To1
    } 
    else if(totalWeight>1 && totalWeight<=2){
        deliveryFee=chargeForOutSideoneTo2
    } 
    else if(totalWeight>2 && totalWeight<=3){
        deliveryFee=chargeForOutSidetwoTo3
    } 
  else if (totalWeight > 3) {
    const extraKgs = totalWeight - 3; // Calculate the exact number of extra kilograms beyond 3 kg
    deliveryFee = chargeForOutSidetwoTo3 + (extraOutSideDhakaChange * Math.ceil(extraKgs)); // Add the extra charge for each extra kilogram, rounding up to the nearest whole kg
}
 

}
else{
    //round neck//////////
    if(totalWeight>0 && totalWeight<=0.5){
        deliveryFee=chargeForInSideZeroToP5
    } 
    else if(totalWeight>0.5 && totalWeight<=1){
        deliveryFee=chargeForInSidep5To1
    } 
    else if(totalWeight>1 && totalWeight<=2){
        deliveryFee=chargeForInSideoneTo2
    } 
    else if(totalWeight>2 && totalWeight<=3){
        deliveryFee=chargeForInSidetwoTo3
    } 
    else if (totalWeight > 3) {
        const extraKgs = Math.ceil(totalWeight - 3); // Calculate the number of extra kilograms beyond 3 kg
        deliveryFee = chargeForInSidetwoTo3 + (extraInSideDhakaChange * extraKgs); // Add the extra charge for each extra kilogram
    }
  
  
}

  return({deliveryFee:deliveryFee}) 
};

export default deliveryCharge;
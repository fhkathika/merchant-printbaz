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
    // let total_weight=grandQuantity*weightPerShirt;
let deliveryFeeForTshirt=0
let deliveryFeeForHoodie=0
let deliveryFeeForDropSHolder=0

    if(deliveryAreas==="outsideDhaka"){
     ///////////////round neck tshirt //////////////
    if(total_tshirt_weight>=0 && total_tshirt_weight<=0.5){
        deliveryFeeForTshirt=chargeForOutSideZeroToP5
    } 
    else if(total_tshirt_weight>0.5 && total_tshirt_weight<=1){
        deliveryFeeForTshirt=chargeForOutSidep5To1
    } 
    else if(total_tshirt_weight>1 && total_tshirt_weight<=2){
        deliveryFeeForTshirt=chargeForOutSideoneTo2
    } 
    else if(total_tshirt_weight>2 && total_tshirt_weight<=3){
        deliveryFeeForTshirt=chargeForOutSidetwoTo3
    } 
  else if (total_tshirt_weight > 3) {
    const extraKgs = total_tshirt_weight - 3; // Calculate the exact number of extra kilograms beyond 3 kg
    deliveryFeeForTshirt = chargeForOutSidetwoTo3 + (extraOutSideDhakaChange * Math.ceil(extraKgs)); // Add the extra charge for each extra kilogram, rounding up to the nearest whole kg
}
//////////////////hoodie//////////////////////
    if(total_Hoodie_weight>=0 && total_Hoodie_weight<=0.5){
        deliveryFeeForHoodie=chargeForOutSideZeroToP5
    } 
    else if(total_Hoodie_weight>0.5 && total_Hoodie_weight<=1){
        deliveryFeeForHoodie=chargeForOutSidep5To1
    } 
    else if(total_Hoodie_weight>1 && total_Hoodie_weight<=2){
        deliveryFeeForHoodie=chargeForOutSideoneTo2
    } 
    else if(total_Hoodie_weight>2 && total_Hoodie_weight<=3){
        deliveryFeeForHoodie=chargeForOutSidetwoTo3
    } 
  else if (total_Hoodie_weight > 3) {
    const extraKgs = total_Hoodie_weight - 3; // Calculate the exact number of extra kilograms beyond 3 kg
    deliveryFeeForHoodie = chargeForOutSidetwoTo3 + (extraOutSideDhakaChange * Math.ceil(extraKgs)); // Add the extra charge for each extra kilogram, rounding up to the nearest whole kg
}

 /////////////////drop sholder ///////////////////
    if(total_DropSHolder_weight>=0 && total_DropSHolder_weight<=0.5){
        deliveryFeeForDropSHolder=chargeForOutSideZeroToP5
    } 
    else if(total_DropSHolder_weight>0.5 && total_DropSHolder_weight<=1){
        deliveryFeeForDropSHolder=chargeForOutSidep5To1
    } 
    else if(total_DropSHolder_weight>1 && total_DropSHolder_weight<=2){
        deliveryFeeForDropSHolder=chargeForOutSideoneTo2
    } 
    else if(total_DropSHolder_weight>2 && total_DropSHolder_weight<=3){
        deliveryFeeForDropSHolder=chargeForOutSidetwoTo3
    } 
  else if (total_DropSHolder_weight > 3) {
    const extraKgs = total_DropSHolder_weight - 3; // Calculate the exact number of extra kilograms beyond 3 kg
    deliveryFeeForDropSHolder = chargeForOutSidetwoTo3 + (extraOutSideDhakaChange * Math.ceil(extraKgs)); // Add the extra charge for each extra kilogram, rounding up to the nearest whole kg
}

}
else{
    //round neck//////////
    if(total_tshirt_weight>=0 && total_tshirt_weight<=0.5){
        deliveryFeeForTshirt=chargeForInSideZeroToP5
    } 
    else if(total_tshirt_weight>0.5 && total_tshirt_weight<=1){
        deliveryFeeForTshirt=chargeForInSidep5To1
    } 
    else if(total_tshirt_weight>1 && total_tshirt_weight<=2){
        deliveryFeeForTshirt=chargeForInSideoneTo2
    } 
    else if(total_tshirt_weight>2 && total_tshirt_weight<=3){
        deliveryFeeForTshirt=chargeForInSidetwoTo3
    } 
    else if (total_tshirt_weight > 3) {
        const extraKgs = Math.ceil(total_tshirt_weight - 3); // Calculate the number of extra kilograms beyond 3 kg
        deliveryFeeForTshirt = chargeForInSidetwoTo3 + (extraInSideDhakaChange * extraKgs); // Add the extra charge for each extra kilogram
    }
    ///////////hoodie//////////////////
    if(total_Hoodie_weight>=0 && total_Hoodie_weight<=0.5){
        deliveryFeeForHoodie=chargeForInSideZeroToP5
    } 
    else if(total_Hoodie_weight>0.5 && total_Hoodie_weight<=1){
        deliveryFeeForHoodie=chargeForInSidep5To1
    } 
    else if(total_Hoodie_weight>1 && total_Hoodie_weight<=2){
        deliveryFeeForHoodie=chargeForInSideoneTo2
    } 
    else if(total_Hoodie_weight>2 && total_Hoodie_weight<=3){
        deliveryFeeForHoodie=chargeForInSidetwoTo3
    } 
    else if (total_Hoodie_weight > 3) {
        const extraKgs = Math.ceil(total_Hoodie_weight - 3); // Calculate the number of extra kilograms beyond 3 kg
        deliveryFeeForHoodie = chargeForInSidetwoTo3 + (extraInSideDhakaChange * extraKgs); // Add the extra charge for each extra kilogram
    }
    //////////// drop sholder ////////////////////////
    if(total_DropSHolder_weight>=0 && total_DropSHolder_weight<=0.5){
        deliveryFeeForDropSHolder=chargeForInSideZeroToP5
    } 
    else if(total_DropSHolder_weight>0.5 && total_DropSHolder_weight<=1){
        deliveryFeeForDropSHolder=chargeForInSidep5To1
    } 
    else if(total_DropSHolder_weight>1 && total_DropSHolder_weight<=2){
        deliveryFeeForDropSHolder=chargeForInSideoneTo2
    } 
    else if(total_DropSHolder_weight>2 && total_DropSHolder_weight<=3){
        deliveryFeeForDropSHolder=chargeForInSidetwoTo3
    } 
    else if (total_DropSHolder_weight > 3) {
        const extraKgs = Math.ceil(total_DropSHolder_weight - 3); // Calculate the number of extra kilograms beyond 3 kg
        deliveryFeeForDropSHolder = chargeForInSidetwoTo3 + (extraInSideDhakaChange * extraKgs); // Add the extra charge for each extra kilogram
    }
  
  
}
deliveryFee=
deliveryFeeForTshirt+
deliveryFeeForHoodie+
deliveryFeeForDropSHolder
console.log("total_tshirt_weight",total_tshirt_weight)
console.log("total_Hoodie_weight",total_Hoodie_weight)
console.log("total_DropSHolder_weight",total_DropSHolder_weight)

console.log("deliveryFee..........",deliveryFee)
console.log("deliveryFeeForTshirt..........",deliveryFeeForTshirt)
console.log("deliveryFeeForHoodie..........",deliveryFeeForHoodie)
console.log("deliveryFeeForDropSHolder..........",deliveryFeeForDropSHolder)
  return({deliveryFee:deliveryFee}) 
};

export default deliveryCharge;
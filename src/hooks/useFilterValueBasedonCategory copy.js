import React from 'react';
import useGetTshirtPrice from './useGetTshirtPrice';

const useFilterValueBasedonCategory = () => {
    const { tshirtPrice } = useGetTshirtPrice();
      // custom round neck 
  
   const customRoundNeckFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Custom Round Neck")
  
const customDropSholderFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Custom Drop Sholder")
const customHoodieFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Custom Hoodie")
// blank product filter 
const blankRoundNeckFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Blank Round Neck")
const blankDropSholderFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Blank Drop Sholder")
const blankHoodieFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Blank Hoodie")
// custom round neck backside 
let customRoundNeckinputFront10X14=customRoundNeckFilter?.find(thsirt => thsirt.printSizeFront === "10 x 14")
let customRoundNeckinputFront10X10=customRoundNeckFilter?.find(thsirt => thsirt.printSizeFront === "10 x 10")
let customRoundNeckinputFront10X5=customRoundNeckFilter?.find(thsirt => thsirt.printSizeFront === "10 x 5")
let customRoundNeckinputFront5X5=customRoundNeckFilter?.find(thsirt => thsirt.printSizeFront === "5 x 5")
let customRoundNeckinputFront2p5X5=customRoundNeckFilter?.find(thsirt => thsirt.printSizeFront === "2.5 x 5")
let customRoundNeckinputFront2p5X2p5=customRoundNeckFilter?.find(thsirt => thsirt.printSizeFront === "2.5 x 2.5")
// custom round neck backside 
let customRoundNeckinputBack10X14=customRoundNeckFilter?.find(thsirt => thsirt.printSizeBack === "10 x 14")
let customRoundNeckinputBack10X10=customRoundNeckFilter?.find(thsirt => thsirt.printSizeBack === "10 x 10")
let customRoundNeckinputBack10X5=customRoundNeckFilter?.find(thsirt => thsirt.printSizeBack === "10 x 5")
let customRoundNeckinputBack5X5=customRoundNeckFilter?.find(thsirt => thsirt.printSizeBack === "5 x 5")
let customRoundNeckinputBack2p5X5=customRoundNeckFilter?.find(thsirt => thsirt.printSizeBack === "2.5 x 5")
let customRoundNeckinputBack2p5X2p5=customRoundNeckFilter?.find(thsirt => thsirt.printSizeBack === "2.5 x 2.5")

// custom round neck front 
let customDropSholderinputFront11p7X16p5=customDropSholderFilter?.find(thsirt => thsirt.printSizeFront === "11.7 x 16.5 (A3)")
let customDropSholderinputFront10X14=customDropSholderFilter?.find(thsirt => thsirt.printSizeFront === "10 x 14")
let customDropSholderinputFront10X10=customDropSholderFilter?.find(thsirt => thsirt.printSizeFront === "10 x 10 (A4)")
let customDropSholderinputFront10X5=customDropSholderFilter?.find(thsirt => thsirt.printSizeFront === "10 x 5")
let customDropSholderinputFront5X5=customDropSholderFilter?.find(thsirt => thsirt.printSizeFront === "5 x 5")
let customDropSholderinputFront2p5X5=customDropSholderFilter?.find(thsirt => thsirt.printSizeFront === "2.5 x 5")
let customDropSholderinputFront2p5X2p5=customDropSholderFilter?.find(thsirt => thsirt.printSizeFront === "2.5 x 2.5")
// custom drop sholder backside 
let customDropSholderinputBack11p7X16p5=customDropSholderFilter?.find(thsirt => thsirt.backSideprice === "11.7 x 16.5 (A3)")
let customDropSholderinputBack10X14=customDropSholderFilter?.find(thsirt => thsirt.printSizeBack === "10 x 14")
let customDropSholderinputBack10X10=customDropSholderFilter?.find(thsirt => thsirt.printSizeBack === "10 x 10 (A4)")
let customDropSholderinputBack10X5=customDropSholderFilter?.find(thsirt => thsirt.printSizeBack === "10 x 5")
let customDropSholderinputBack5X5=customDropSholderFilter?.find(thsirt => thsirt.printSizeBack === "5 x 5")
let customDropSholderinputBack2p5X5=customDropSholderFilter?.find(thsirt => thsirt.printSizeBack === "2.5 x 5")
let customDropSholderinputBack2p5X2p5=customDropSholderFilter?.find(thsirt => thsirt.printSizeBack === "2.5 x 2.5")

// custom hoodie front 
let customHoodieinputFront11p7X16p5=customHoodieFilter?.find(thsirt => thsirt.printSizeFront === "11.7 x 16.5 (A3)")
let customHoodieinputFront10X14=customHoodieFilter?.find(thsirt => thsirt.printSizeFront === "10 x 14")
let customHoodieinputFront10X10=customHoodieFilter?.find(thsirt => thsirt.printSizeFront === "10 x 10 (A4)")
let customHoodieinputFront10X5=customHoodieFilter?.find(thsirt => thsirt.printSizeFront === "10 x 5")
let customHoodieinputFront5X5=customHoodieFilter?.find(thsirt => thsirt.printSizeFront === "5 x 5")
let customHoodieinputFront2p5X5=customHoodieFilter?.find(thsirt => thsirt.printSizeFront === "2.5 x 5")
let customHoodieinputFront2p5X2p5=customHoodieFilter?.find(thsirt => thsirt.printSizeFront === "2.5 x 2.5")

// custom hoodie back side 

let customHoodieinputBack11p7X16p5=customHoodieFilter?.find(thsirt => thsirt.printSizeBack === "11.7 x 16.5 (A3)")
let customHoodieinputBack10X14=customHoodieFilter?.find(thsirt => thsirt.printSizeBack === "10 x 14")
let customHoodieinputBack10X10=customHoodieFilter?.find(thsirt => thsirt.printSizeBack === "10 x 10 (A4)")
let customHoodieinputBack10X5=customHoodieFilter?.find(thsirt => thsirt.printSizeBack === "10 x 5")
let customHoodieinputBack5X5=customHoodieFilter?.find(thsirt => thsirt.printSizeBack === "5 x 5")
let customHoodieinputBack2p5X5=customHoodieFilter?.find(thsirt => thsirt.printSizeBack === "2.5 x 5")
let customHoodieinputBack2p5X2p5=customHoodieFilter?.find(thsirt => thsirt.printSizeBack === "2.5 x 2.5")
return({blankRoundNeckFilter,blankDropSholderFilter,
    blankHoodieFilter,customRoundNeckinputFront10X14,
    customRoundNeckinputFront10X10,
    customRoundNeckinputFront10X5,
    customRoundNeckinputFront5X5,
    customRoundNeckinputFront2p5X5,
    customRoundNeckinputFront2p5X2p5,
    customRoundNeckinputBack10X14,
    customRoundNeckinputBack10X10,
    customRoundNeckinputBack10X5,
    customRoundNeckinputBack5X5,
    customRoundNeckinputBack2p5X5,
    customRoundNeckinputBack2p5X2p5,
    customDropSholderinputFront11p7X16p5,
    customDropSholderinputFront10X14,
    customDropSholderinputFront10X10,
    customDropSholderinputFront10X5,
    customDropSholderinputFront5X5,
    customDropSholderinputFront2p5X5,
    customDropSholderinputFront2p5X2p5,
    customDropSholderinputBack11p7X16p5,
    customDropSholderinputBack10X14,
customDropSholderinputBack10X10,
customDropSholderinputBack10X5,
customDropSholderinputBack5X5,
customDropSholderinputBack2p5X5,
customDropSholderinputBack2p5X2p5,
customHoodieinputFront11p7X16p5,
customHoodieinputFront10X14,
customHoodieinputFront10X10,
customHoodieinputFront10X5,
customHoodieinputFront5X5,
customHoodieinputFront2p5X5,
customHoodieinputFront2p5X2p5,
customHoodieinputBack11p7X16p5,
customHoodieinputBack10X14,
customHoodieinputBack10X10,
customHoodieinputBack10X5,
customHoodieinputBack5X5,
customHoodieinputBack2p5X5,
customHoodieinputBack2p5X2p5
})
};


export default useFilterValueBasedonCategory;
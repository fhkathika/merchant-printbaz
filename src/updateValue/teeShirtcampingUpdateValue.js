
  // update function
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase.config";
  const teeShirtcampingUpdateValue = async (
    id,
price1to9_10x14,
price10to19_10x14,
price20to29_10x14,
price30to40_10x14,
price41to49_10x14,
price50Plus_10x14,
price1to9_10x10,
price10to19_10x10,
price20to29_10x10,
price30to40_10x10,
price41to49_10x10,
price50Plus_10x10,
price1to9_10x5,
price10to19_10x5,
price20to29_10x5,
price30to40_10x5,
price41to49_10x5,
price50Plus_10x5,
price1to9_5X5,
price10to19_5X5,
price20to29_5X5,
price30to40_5X5,
price41to49_5X5,
price50Plus_5X5,
price1to9_2p5X5,
price10to19_2p5X5,
price20to29_2p5X5,
price30to40_2p5X5,
price41to49_2p5X5,
price50Plus_2p5X5
) => {
  const tshirtDoc = doc(db, "productValues", id ?? "teeShirtCampingId");
  await updateDoc(tshirtDoc, {
    printSize10x14:{
        price1to9_10x14:Number(price1to9_10x14),
        price10to19_10x14:Number(price10to19_10x14),
        price20to29_10x14:Number(price20to29_10x14),
        price30to40_10x14:Number(price30to40_10x14),
        price41to49_10x14:Number(price41to49_10x14),
        price50Plus_10x14:Number(price50Plus_10x14),
    },

 printSize_10x10:{
    price1to9_10x10:Number(price1to9_10x10),
    price10to19_10x10:Number(price10to19_10x10),
    price20to29_10x10:Number(price20to29_10x10),
    price30to40_10x10:Number(price30to40_10x10),
    price41to49_10x10:Number(price41to49_10x10),
    price50Plus_10x10:Number(price50Plus_10x10),
 },
 printSize_10x5:{
    price1to9_10x5:Number(price1to9_10x5),
    price10to19_10x5:Number(price10to19_10x5),
    price20to29_10x5:Number(price20to29_10x5),
    price30to40_10x5:Number(price30to40_10x5),
    price41to49_10x5:Number(price41to49_10x5),
    price50Plus_10x5:Number(price50Plus_10x5),
 },
 printSize_5x5:{
    price1to9_5X5:Number(price1to9_5X5),
    price10to19_5X5:Number(price10to19_5X5),
    price20to29_5X5:Number(price20to29_5X5),
    price30to40_5X5:Number(price30to40_5X5),
    price41to49_5X5:Number(price41to49_5X5),
    price50Plus_5X5:Number(price50Plus_5X5),
 },
   
 printSize2p5X5:{
    price1to9_2p5X5:Number(price1to9_2p5X5),
    price10to19_2p5X5:Number(price10to19_2p5X5),
    price20to29_2p5X5:Number(price20to29_2p5X5),
    price30to40_2p5X5:Number(price30to40_2p5X5),
    price41to49_2p5X5:Number(price41to49_2p5X5),
    price50Plus_2p5X5:Number(price50Plus_2p5X5),
 } 
   
    });
  return;
};
export  default teeShirtcampingUpdateValue

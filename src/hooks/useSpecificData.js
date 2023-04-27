import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useSpecificData = () => {
    const [showSpacficData,setShowSpacficData]=useState(true)
    const loacation=useLocation();
    useEffect(()=>{
        if (loacation?.pathname === '/businessCard/form'||loacation?.pathname ==='/custom_hoodie/form'|| loacation?.pathname ==='/hoodie_on_demand/form' || loacation?.pathname ==='/tee_shirts/polo_tee_shirts/form'
        ||loacation?.pathname === '/ramadanCalender/form'
        ||loacation?.pathname === '/customWallPoster/form'
        ||loacation?.pathname === '/custom_printed_tee_shirts/form'
        ||loacation?.pathname === '/poster/form'
        ||loacation?.pathname === '/digital_printed_tee_shirt/form'
        ||loacation?.pathname === '/custom_musk/form'
        ||loacation?.pathname === '/thank_you_cards/form'
        ||loacation?.pathname === '/handleNonWovenBags/form'
        ||loacation?.pathname === '/dCutNonWovenBag/form'
        ||loacation?.pathname === '/crest/form'
        ||loacation?.pathname === '/id_card/form'
        ||loacation?.pathname === '/stand_banner/form'
        ||loacation?.pathname === '/letterhead/form'
        ||loacation?.pathname === '/letter_envelope/form'
        ||loacation?.pathname === '/a4Envelope/form'
        ||loacation?.pathname === '/posterOnDemand/form'
        ||loacation?.pathname === '/inkjetSticker/form'
        ||loacation?.pathname === '/catalogue/form'
        ||loacation?.pathname === '/mug/form'
        ||loacation?.pathname === '/leaflet/form'
        ||loacation?.pathname === '/certificate/form'
        ||loacation?.pathname === '/polo_tee_shirts/form'
        ||loacation?.pathname === '/custom_notebook/form'
        ||loacation?.pathname === '/standeredCustomNotebook/form'
        ||loacation?.pathname === '/economy_notebook/form'
        ||loacation?.pathname === '/brandLabel/form'
        ||loacation?.pathname === '/courierSticker/form'
        ||loacation?.pathname === '/paperTableMat/form'
        ||loacation?.pathname === '/moneyReceipt/form'

        ||loacation?.pathname === '/deliveryChallan/form'
        ||loacation?.pathname === '/paperSticker/form'
        ||loacation?.pathname === '/paperStickerOnDemand/form'
        ||loacation?.pathname === '/hangTag/form'
        ||loacation?.pathname === '/normal_wall_calender/form'
        ||loacation?.pathname === '/desk_calender/form'
        ||loacation?.pathname === '/economy_wall_calender/form'
        ||loacation?.pathname === '/shopping-bag/artpaper-shopping-bag-small/form'
        ||loacation?.pathname === '/shopping-bag/artpaper-shopping-bag-medium/form'
        ||loacation?.pathname === '/shopping-bag/artpaper-shopping-bag-large/form'
        ||loacation?.pathname === '/shopping-bag/duplex-shopping-bag-medium/form'
        ||loacation?.pathname === '/shopping-bag/duplex-shopping-bag-large/form'
        ||loacation?.pathname === '/shopping-bag/duplex-shopping-bag-extra-large/form'
        ||loacation?.pathname === '/shopping-bag/duplex-shopping-bag-xxlarge/form'
        ||loacation?.pathname === '/shopping-bag/swedish-shopping-bag-large/form'

        ||loacation?.pathname === '/shopping-bag/swedish-shopping-bag-extra-large/form'
        ||loacation?.pathname === '/shopping-bag/swedish-shopping-bag-large/form'
        ||loacation?.pathname === '/shopping-bag/swedish-shopping-bag-large/form'
        ||loacation?.pathname === '/shopping-bag/swedish-shopping-bag-large/form'
        ||loacation?.pathname === '/magazine/form'
        
        
        
        ) {
          setShowSpacficData(true);
        } else {
          setShowSpacficData(false);
        }
      })
      return {showSpacficData,setShowSpacficData};
};

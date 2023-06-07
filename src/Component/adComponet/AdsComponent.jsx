import React, { useEffect } from 'react';

const AdsComponent = (props) => {
    const { dataAdSlot } = props;

console.log("dataAdSlot",dataAdSlot);

    useEffect(() => {

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }

        catch (e) {

        }

    }, []);
    return (
       <>
        {/* Ads01  */}
        <ins class="adsbygoogle"
     style={{display:"block"}}
     data-ad-client="ca-pub-4692348192702438"
     data-ad-slot={dataAdSlot}
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
  
       </>
    );
};

export default AdsComponent;
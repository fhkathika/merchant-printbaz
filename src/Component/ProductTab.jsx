

import React, { useState } from 'react';
import "../css/productStyles.css"
const ProductTab = ({describtion}) => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('Describtion');

  return (
    <div className='container'> 
        <div className='tabStyle'>
      {/* Tab Headers */}
      <button className='buttonStyle' style={{backgroundColor:"#012652",color:"white",border:"none",padding:"10px",borderRadius:"5px"}} onClick={() => setActiveTab('Describtion')}>Describtion</button>
      <button className='buttonStyle' style={{backgroundColor:"#012652",color:"white",border:"none",padding:"10px",borderRadius:"5px",marginLeft:"5px"}}onClick={() => setActiveTab('Terms & Condition')}>Terms & Condition</button>
      </div>
      {/* Tab Content */}
      {activeTab === 'Describtion' && (
        <div id="Describtion" className="city " >
          <h2>Describtion</h2>
          <p>{describtion}</p>
        </div>
      )}

      {activeTab === 'Terms & Condition' && (
        <div id="Terms & Condition" className="city tabContentStyle">
          <h2>Terms & Condition</h2>
          <p>Terms & Condition is the capital of France.</p>
        </div>
      )}

    
    </div>
  );
};

export default ProductTab;

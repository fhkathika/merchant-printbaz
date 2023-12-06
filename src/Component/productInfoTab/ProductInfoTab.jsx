import { useState } from "react";
import '../../css/styles.css'
const ProductInfoTab = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tab-container">
      <div className="tab-buttons">
        <button onClick={() => openTab('Home')} className={activeTab === 'Home' ? 'active' : ''}>Describsion</button>
        <button onClick={() => openTab('Option1')} className={activeTab === 'Option1' ? 'active' : ''}>Size</button>
      
      </div>

      <div className="tab-content">
        {activeTab === 'Home' && <div><h3 >Describsion</h3><p>Describsion tab content...</p></div>}
        {activeTab === 'Option1' && 
        
        <table class="size_table">
<thead>
  <tr>
    <th class="tg-0lax_title tg-0lax">SIZE</th>
    <th class="tg-0lax_title tg-0lax">XS</th>
    <th class="tg-0lax_title tg-0lax">M</th>
    <th class="tg-0lax_title tg-0lax">L</th>
    <th class="tg-0lax_title tg-0lax">XL</th>
    <th class="tg-0lax_title tg-0lax">XXL</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">CHEST</td>
    <td class="tg-0lax">13.5</td>
    <td class="tg-0lax">40</td>
    <td class="tg-0lax">42</td>
    <td class="tg-0lax">44</td>
    <td class="tg-0lax">45</td>
  </tr>
  <tr>
    <td class="tg-0lax">LENGHT</td>
    <td class="tg-0lax">18</td>
    <td class="tg-0lax">27</td>
    <td class="tg-0lax">28</td>
    <td class="tg-0lax">29</td>
    <td class="tg-0lax">29</td>
  </tr>
</tbody>
</table>
        }
       
      </div>
    </div>
  );
};

export default ProductInfoTab;

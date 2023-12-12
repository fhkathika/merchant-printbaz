

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
        <div className="row m45 m_1responsive700 mb-3">
                <div className="col-12">
                  <h3>Terms and Conditions</h3>
                  <ul>
                    <li>
                      সকাল ১১ টার পরে প্লেইস করা অর্ডার পরের দিন থেকে শিডিউল করা হবে।
                    </li>
                    <li>
                      ভিন্ন ডেলিভারি এড্রেসে ডেলিভারি এর জন্য অবশ্যই “New Order”
                      ক্রিয়েট করতে হবে।{" "}
                    </li>
                    <li>
                      প্রোমোশনাল এড অন্সঃ হ্যাংটাগ, ব্র্যান্ড লেবেল, থ্যাংক ইউ কার্ড,
                      অথবা স্পেশাল নোটসহ ডেলিভারি এর জন্য অবশ্যই আলাদা ইনভয়েসিং করা
                      হবে। (কাস্টমার কেয়ারে যোগাযোগ করতে হবে)
                    </li>
                    <li>
                      সঠিক প্রিন্ট সাইজ সিলেক্ট করতে হবে এবং মেইন ফাইলে প্রিন্ট সাইজ
                      উল্লিখিত থাকতে হবে। (যেমনঃ 2.5” x 2” সাইজের কোন প্রিন্ট থাকলে
                      সেটার জন্য 2.5” x 5” এর প্রিন্টিং প্যারামিটার সিলেক্ট করতে হবে)
                    </li>
                    <li>
                      একই টিশার্টে একের অধিক প্রিন্টের রিকোয়ারমেন্ট থাকলেঃ ১। অবশ্যই
                      Special Instructions বক্সে লিখে দিতে হবে ২। মকআপ দিতে হবে ৩।
                      অর্ডার প্লেইস করার পর ১ ঘন্টার ভিতরে কাস্টমার সার্ভিসে কল করে
                      জানাতে হবে। ৪। বিল এডজাস্ট করে নিতে হবে।
                    </li>
                  </ul>
                  <span style={{fontWeight:"bold"}}>
                    {" "}
                    ফেইক কাস্টোমার অথবা রিটার্নের ব্যপারে সতর্ক থাকুন। রিটার্নের
                    খরচ ব্র্যান্ডকেই বিয়ার করতে হবে এবং অত্যাধিক (৩ পিস+) আনপেইড
                    রিটার্নের ক্ষেত্রে একাউন্ট সাস্পেন্ডেড হতে পারে
                  </span>
                </div>
              </div>
        </div>
      )}

    
    </div>
  );
};

export default ProductTab;

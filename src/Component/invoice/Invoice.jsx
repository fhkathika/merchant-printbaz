import React, { useState } from 'react';

const Invoice = () => {
    const [inputFields, setInputFields] = useState(
      [  { name: '', age: '' ,images:[]}]
      )
      const addFields = () => {
        setInputFields([...inputFields, { age: '' }]);
      }
      
      
    return (
        <div className="App">
            <button onClick={addFields}>Add field</button>
        <form>
          {inputFields.map((input, index) => {
            return (
              <div key={index}>
                <input
                  name='name'
                  placeholder='Name'
                  value={input.name}
                />
               <input
  name='age'
  placeholder='Age'
  value={input.age}
/>       <input
  name='images'
  type="file"
  placeholder='Age'
  value={input.images}
/>
              </div>
            )
          })}
        </form>
      </div>
    );
};

export default Invoice;
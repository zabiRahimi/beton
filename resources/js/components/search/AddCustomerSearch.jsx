// ChildComponent.jsx
import React from 'react';

const AddCustomerSearch = ({ parentData, updateParent, callParentMethod }) => {
  const sendDataToParent = () => {
    updateParent('Hello from Child');
  };

  return (
    <div>
      <h2>Child Component</h2>
      <p>Received from Parent: {parentData}</p>
      <button onClick={sendDataToParent}>Send Data to Parent</button>
      <button onClick={callParentMethod}>Call Parent Method</button>
    </div>
  );
};

export default AddCustomerSearch;
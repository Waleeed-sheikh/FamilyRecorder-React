import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import "./style.css"

import StepForm from './StepForm';
const Model= () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };


  const CustomModalTitle = () => {
    return (
      <h2 style={{ color: "black", marginTop:'0px' ,display:'flex',justifyContent:'center',alignItems:"center"}}>Add Record</h2> // Adjust styles as needed
    );
  };

  const submitted=()=>{
          
          setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  return (
    <>
      <Button className='hi' type="primary" onClick={showModal}>
        Create New
      </Button>
      <Modal  title={<CustomModalTitle />} open={isModalOpen} footer={null} onCancel={handleCancel} 
          
        
         >
        <StepForm onFormSubmit={submitted}/>
      </Modal>
    </>
  );
};
export default Model;
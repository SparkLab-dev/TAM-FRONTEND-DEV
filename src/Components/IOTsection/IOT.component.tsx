// Import necessary libraries
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Define types for your data
interface MyComponentProps {
  id: number; // Assuming you'll pass an ID to identify the component
}

interface MyData {
  field1: string;
  field2: string;
}

// Create the styled components for your fields and buttons
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items:center;
  max-width: 300px;

  padding-bottom:20px;
 min-width:250px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height:fit-content;
  @media (max-width: 768px) {
    width: calc(100% - 70px);
    max-width:450px;
    margin-left:55px;
    
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-family:poppins;
  font-weight: 500;
`;

const Field = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  width: 230px;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background-color: #4F734C;
  color:white;
  font-family:roboto;
  font-weight:500;
  
  &:hover {
   background-color: #50a164;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const MyComponent: React.FC<MyComponentProps> = ({ id }) => {
  const [data, setData] = useState<MyData>({ field1: 'test1', field2: 'test2' });

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/getInfo/${id}`);
        setData(response.data);
      } catch (error) {
        // Handle error
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/changeInfo/${id}`, data);
      // Handle success
    } catch (error) {
      // Handle error
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/deleteInfo/${id}`);
      // Handle success or perform necessary actions after deletion
    } catch (error) {
      // Handle error
      console.error('Error deleting data:', error);
    }
  };

  return (
    <Container>
     <h2 style={{fontFamily:"Poppins",fontWeight:700,fontSize:"21px"}}>Connect your device</h2>
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <Label style={{alignSelf:"flex-start"}}>Lock ID:</Label>
      <Field
        type="text"
        value={data.field1}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'field1')}
      />
    </div>
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <Label style={{alignSelf:"flex-start"}}>Lock Key:</Label>
      <Field
        type="text"
        value={data.field2}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'field2')}
      />
    </div>
    
    <Button onClick={handleSave}>CONNECT</Button>
  </Container>
  );
};

export default MyComponent;

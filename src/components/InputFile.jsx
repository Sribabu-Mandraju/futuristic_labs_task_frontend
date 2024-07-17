import React from 'react';
import styled from 'styled-components';

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const FileName = styled.span`
  margin-left: 10px;
`;

const CustomFileInput = ({ onFileChange }) => {
  const [fileName, setFileName] = React.useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
    onFileChange(event); // Call the parent's onFileChange function
  };

  return (
    <FileInputWrapper>
      <HiddenFileInput 
        type="file" 
        id="file" 
        accept=".json"
        onChange={handleFileChange} 
      />
      <StyledLabel htmlFor="file">Choose File</StyledLabel>
      {fileName && <FileName>{fileName}</FileName>}
    </FileInputWrapper>
  );
};

export default CustomFileInput;

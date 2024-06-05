import React, { useState } from 'react';
import FileInput from './FileInput';

const CerebriaPhilipsUpload = ({ setCerebriaFile, setPhilipsFiles }) => {
  const handleCerebriaFileChange = (event) => {
    setCerebriaFile(event.target.files[0]);
  };

  const handlePhilipsFileChange = (event, style) => {
    setPhilipsFiles(prevState => ({ ...prevState, [style]: event.target.files[0] }));
  };

  return (
    <div className="upload-section">
      <div className="category">
        <h2>Cerebria</h2>
        <FileInput label="Cerebria" onChange={handleCerebriaFileChange} />
      </div>
      <div className="category">
        <h2>Philips</h2>
        <div>
          <FileInput label="PIM" onChange={(e) => handlePhilipsFileChange(e, 'pim')} />
          <FileInput label="PIM Control Lib" onChange={(e) => handlePhilipsFileChange(e, 'pimControl')} />
          <FileInput label="Guide Wire" onChange={(e) => handlePhilipsFileChange(e, 'guideWire')} />
          <FileInput label="Algorithm Lib" onChange={(e) => handlePhilipsFileChange(e, 'algorithm')} />
        </div>
      </div>
    </div>
  );
};

export default CerebriaPhilipsUpload;
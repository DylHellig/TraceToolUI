import React from "react";

const FileInput = ({ label, onChange }) => {
  return (
    <label>
      <span>{label}</span>
      <input type="file" onChange={onChange} />
    </label>
  );
};

export default FileInput;

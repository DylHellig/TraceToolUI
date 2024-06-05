import React from 'react';
import './Sidebar.css';

const Sidebar = ({ menuOpen, handleModeChange }) => {
  return (
    <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <ul>
        <li onClick={() => handleModeChange('Inspect Single Matrix')}>Inspect Single Matrix</li>
        <li onClick={() => handleModeChange('Compare Cerebria to Cerebria')}>Compare Cerebria to Cerebria</li>
        <li onClick={() => handleModeChange('Compare Philips to Philips')}>Compare Philips to Philips</li>
        <li onClick={() => handleModeChange('Compare Cerebria to Philips')}>Compare Cerebria to Philips</li>
      </ul>
    </div>
  );
};

export default Sidebar;

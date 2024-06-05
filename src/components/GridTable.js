import React from 'react';
import { Grid } from 'gridjs-react';
import { html } from 'gridjs';
import axios from 'axios';
import 'gridjs/dist/theme/mermaid.css';

const GridTable = ({ title, data, columns, message, onWordClick }) => {
  // Function to handle click events on specific words
  // const handleClick = (word) => {
  //   alert(`You clicked on: ${word}`);
  // };

  // const handleClick = async (word) => {
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/comparison', { word });
  //     console.log('API response:', response.data);
  //   } catch (error) {
  //     console.error('Error sending data to the API:', error);
  //   }
  // };

  // Ensure the custom click handler is globally accessible
  // window.handleClick = handleClick;

  // Custom formatter to make certain words clickable and preserve newline characters
  const customFormatter = (cell, wordsToMakeClickable) => {
    if (typeof cell === 'string') {
      const regex = new RegExp(`\\b(${wordsToMakeClickable.join('|')})\\b`, 'g');

      // Split the cell content by newline characters
      const lines = cell.split('\n');

      // Process each line to make specific patterns clickable
      const processedLines = lines.map(line => {
        const parts = line.split(regex);
        return parts.map(part => {
          if (wordsToMakeClickable.includes(part)) {
            return `<button style="border: none; background: none; color: blue; text-decoration: underline; cursor: pointer;" onclick="window.handleClick('${part}')">${part}</button>`;
          }
          return part;
        }).join('');
      });

      // Join processed lines with <br> to preserve newlines in HTML
      return html(`<div style="white-space: pre-wrap;">${processedLines.join('<br>')}</div>`);
    }
    return cell;
  };

  window.handleClick = onWordClick;

  // Add custom renderers for columns that may contain clickable words
  const enhancedColumns = columns.map(col => ({
    ...col,
    formatter: (cell) => customFormatter(cell, col.clickableWords || [])
  }));

  return (
    <div className="dataframe-section">
      {title && <h2>{title}</h2>}
      {message && <div>{message}</div>}
      <Grid
        data={data}
        columns={enhancedColumns}
        search={true}
        sort={true}
        pagination={{
          enabled: true,
          limit: 10,
        }}
      />
    </div>
  );
};

export default GridTable;

import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import CerebriaPhilipsUpload from "./components/CerebriaPhilipsUpload";
import UploadButton from "./components/UploadButton";
import GridTable from "./components/GridTable";

function App() {
  const [cerebriaFile, setCerebriaFile] = useState(null);
  const [philipsFiles, setPhilipsFiles] = useState({
    pim: null,
    pimControl: null,
    guideWire: null,
    algorithm: null,
  });

  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [table3Data, setTable3Data] = useState(null);
  const [codes, setCodes] = useState(null);

  const [comparisonData, setComparisonData] = useState(null);
  const [comparisonMode, setComparisonMode] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    if (cerebriaFile) {
      formData.append("cerebriaFile", cerebriaFile);
    }
    Object.entries(philipsFiles).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/uploadfiles/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTable1Data(res.data.table1);
      setTable2Data(res.data.table2);
      setTable3Data(res.data.table3);
      setCodes(res.data.codes);
      console.log("Upload successful", res.data);
    } catch (error) {
      console.error("There was an error uploading the files!", error);
    }
  };

  const handleWordClick = async (word) => {
    console.log(`Word clicked: ${word}`);
    try {
      const response = await axios.post('http://127.0.0.1:8000/comparison', { word });
      console.log('Comparison API response:', response.data);
      setComparisonData(response.data);
      setComparisonMode(true); // Switch to comparison mode
    } catch (error) {
      console.error('Error sending data to the API:', error);
    }
  };

  const handleBack = () => {
    setComparisonMode(false);
    setComparisonData(null);
  };

  return (
    <div className="App">
      {/* <Header setMode={setMode} /> */}
      <h1>Trace Tool</h1>
      <CerebriaPhilipsUpload
        setCerebriaFile={setCerebriaFile}
        setPhilipsFiles={setPhilipsFiles}
      />
      <UploadButton onClick={handleUpload} />
      {!comparisonMode ? (
        <>
          {table1Data && (
            <GridTable
              title="Inconsisent User Needs / Requirements"
              data={table1Data.data}
              columns={table1Data.columns.map((col) => ({
                ...col,
                clickableWords: codes,
              }))}
              onWordClick={handleWordClick}
            />
          )}
          {table2Data && (
            <GridTable
              title="Philips Tracing Not Found in Cerebria Tracability Matrix"
              data={table2Data.data}
              columns={table2Data.columns.map((col) => ({
                ...col,
                clickableWords: codes,
              }))}
              onWordClick={handleWordClick}
            />
          )}
          {table3Data && (
            <GridTable
              title="Cerebria Tracing Not Found in Philips Tracability Matrices"
              data={table3Data.data}
              columns={table3Data.columns.map((col) => ({
                ...col,
                clickableWords: codes,
              }))}
              onWordClick={handleWordClick}
            />
          )}
        </>
      ) : (
        <>
          <GridTable
            title="Cerebria"
            data={comparisonData.cerebriaTable.data}
            columns={comparisonData.cerebriaTable.columns}
            message={comparisonData.cerebriaTable.message}
          />
          <GridTable
            title="Philips"
            data={comparisonData.philipsTable.data}
            columns={comparisonData.philipsTable.columns}
            message={comparisonData.philipsTable.message}
          />
          <button onClick={handleBack}>Back</button>
        </>
      )}
    </div>
  );
}

export default App;

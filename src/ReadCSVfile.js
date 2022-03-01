import React from 'react';
import { useCSVReader } from 'react-papaparse';
const ReadCSVfile = ({ setFileName, setFileContent }) => {
    const { CSVReader } = useCSVReader();
  return (
    <CSVReader onUploadAccepted = {(results) => {
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
        setFileContent(results.data);
      }}>
    {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }) => (
        <>
          <div >
            <button type='button' {...getRootProps()} >
              Browse file
            </button>
            <div>
              {acceptedFile && acceptedFile.name}
              
            </div>
            <button {...getRemoveFileProps()} onClick={() => {setFileContent([])}}>
              Remove
            </button>
          </div>
          <ProgressBar  />
        </>
      )}

    
    </CSVReader>
  );
}

export default ReadCSVfile;

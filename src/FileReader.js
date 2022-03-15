import React from 'react';
import { useCSVReader } from 'react-papaparse';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader'


const FileReader = () => {
    const files = useStoreState((state) => state.files);
    const fileName = useStoreState((state) => state.fileName);
    const fileContent = useStoreState((state) => state.fileContent);
    const fileHeaders = useStoreState((state) => state.fileHeaders);
    
    const setFileContent = useStoreActions((actions) => actions.setFileContent);
    const setFileName = useStoreActions((actions) => actions.setFileName);
    const saveFile = useStoreActions((actions) => actions.saveFile);
    const setFileHeaders = useStoreActions((actions) => actions.setFileHeaders);

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
          header
            .toLowerCase()
            .replace(/\W/g, '_'),
        complete: function(results, file) {
            console.log("Parsing complete:", results.meta.fields);
            setFileHeaders(results.meta.fields);
            
        }
    }
    
    useEffect(() => {
      console.log(fileName)
    }, [fileName]);
    const handleAddFile = (fileName,fileContent,fileHeaders) => {
        const id = files.length ? files[files.length - 1].id + 1 : 1;
        const newFile = { id, fileName: fileName, headers: fileHeaders,content: fileContent};
        saveFile(newFile);
    }
      
  return (
    <main className='ReadCSVfile'>
          <div className='UploadFile'>
            <CSVReader
                cssClass=""
                cssInputClass="form-control"
                label=""
                onFileLoaded={(data, fileInfo, originalFile) => {
                    console.log(data, fileInfo, originalFile)
                    setFileContent(data)
                    setFileName(fileInfo.name)
                    console.log(fileInfo.name)
                }}
                parserOptions={papaparseOptions}
                inputId="inputGroupFile02"
                inputName="input-group-text"
                inputStyle={{color: 'black'}}
            />
            <button className='input-group-text' onClick={() => handleAddFile(fileName,fileContent,fileHeaders)}>
              <FaPlus/>
            </button>
            
          </div>
         
        </main>
  );
}

export default FileReader;

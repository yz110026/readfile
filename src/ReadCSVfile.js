import React from 'react';
import { useCSVReader } from 'react-papaparse';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { FaPlus } from "react-icons/fa";


const ReadCSVfile = () => {

    const files = useStoreState((state) => state.files);
    const fileName = useStoreState((state) => state.fileName);
    const fileContent = useStoreState((state) => state.fileContent);
    const setFileContent = useStoreActions((actions) => actions.setFileContent);
    const setFileName = useStoreActions((actions) => actions.setFileName);
    const saveFile = useStoreActions((actions) => actions.saveFile);
    const ifLogin = useStoreState((state) => state.ifLogin);
    const { CSVReader } = useCSVReader();

    const handleAddFile = (fileName,fileContent) => {
      fileContent.pop();
      const id = files.length ? files[files.length - 1].id + 1 : 1;
      const newFile = { id, fileName: fileName, content: fileContent};
      saveFile(newFile);
  }
  return (
    <CSVReader onUploadAccepted = {(results) => {
        console.log(results)
        setFileContent(results.data)
      }} >
    {({
        getRootProps,
        acceptedFile,
        ProgressBar,
      }) => (
        <main className='ReadCSVfile'>
          <div className='UploadFile'>
            <button type='button' className='input-group-text' {...getRootProps()} >
              Browse file
            </button>
            <div className='AcceptedFile' >
              {acceptedFile && acceptedFile.name && setFileName(acceptedFile.name) ? acceptedFile.name  : 'Choose a CSV file'}
              
            </div>
            <button className='input-group-text' onClick={() => handleAddFile(fileName,fileContent)}>
              <FaPlus/>
            </button>
          </div>
          <ProgressBar  />
          
        </main>
      )}

    
    </CSVReader>
  );
}

export default ReadCSVfile;

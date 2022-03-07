import React from 'react';
import { useCSVReader } from 'react-papaparse';
import { useStoreActions, useStoreState } from 'easy-peasy';

const ReadCSVfile = () => {
    const setFileContent = useStoreActions((actions) => actions.setFileContent);
    const ifLogin = useStoreState((state) => state.ifLogin);
    const { CSVReader } = useCSVReader();
  return (
    <CSVReader onUploadAccepted = {(results) => {
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
        ifLogin ? setFileContent(results.data) : setFileContent([])
        
      }}>
    {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }) => (
        <>
          <div className='ReadCSVfile'>
            <button type='button' className='AddFile' {...getRootProps()} >
              Browse file
            </button>
            <div className='AcceptedFile'>
              {acceptedFile && acceptedFile.name ? acceptedFile.name : 'Choose a CSV file'}
              
            </div>
            <button className='RemoveFile'{...getRemoveFileProps()} onClick={() => {setFileContent([])}}>
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

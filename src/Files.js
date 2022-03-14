import React from 'react';
import { useStoreState } from 'easy-peasy';
import FileItem from './FileItem'
const Files = ({ fetchError, isLoading }) => {
    const  files = useStoreState((state) => state.files);
    const  ifLogin = useStoreState((state) => state.ifLogin);
    if (ifLogin){
      return (
        <main className='Files'>
          {isLoading && <p className="statusMsg">Loading files...</p>}
          {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
          {!isLoading && !fetchError && (files.length ?
            <ul >
              { files && files.map(f => <FileItem key={f.id} file={f}/>)}
            </ul> : 'Please upload files'
          )}
        </main>
        
      );
      
    } else {
      return (
        <main className='Files'>
          <p>Please login to view your files</p>
        </main>
      )
    }
  
}

export default Files;

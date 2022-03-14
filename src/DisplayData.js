import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useParams,useHistory } from 'react-router-dom';
import { useState } from 'react';
const DisplayData = () => {
    const { id } = useParams();
    const history = useHistory();
    const getFileById = useStoreState((state) => state.getFileById);
    const file = getFileById(id);
    
    
    return (
        <div className='DisplayData'>
            {file ? <table className='table table-hover'>
                <tbody key={file.content.id}>
                    {file.content.map(row => (
                        <tr key={row.id}>
                            {row.map(cell => (
                                <td key={cell.id}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table> : history.push('/')}   
        </div> 
        
        
    );
    
}

export default DisplayData;

import React from 'react';
import { useStoreState } from 'easy-peasy';
import { useParams,useHistory } from 'react-router-dom';

const DisplayData = () => {
    const { id } = useParams();
    const history = useHistory();
    const getFileById = useStoreState((state) => state.getFileById);
    const file = getFileById(id);
    
    return (
        <div className='DisplayData'>
            {file ? <table className='table table-hover'>
                <thead>
                    <tr key={file.headers.id}>
                        {file.headers.map(header => (
                        <th key={header.id}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody key={file.content.id}>
                    {file.content.map(row => (
                        <tr key={row.id}>
                            {Object.entries(row).map(([key, value]) => (
                                <td key={key}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table> : history.push('/')}   
        </div> 
        
        
    );
    
}

export default DisplayData;

import React from 'react';
import { useStoreState } from 'easy-peasy';
const DisplayData = () => {
    const fileContent = useStoreState((state) => state.fileContent);
    const ifLogin = useStoreState((state) => state.ifLogin);
    
    if ( !ifLogin ) {
        return (
            <div className='DisplayData'>
                <p>You should Login first!</p>
            </div>
        );
    } else {
        return (
      
            <div className='DisplayData'>
                {console.log({fileContent})}
                { fileContent.length ? 
                <table>
                    <tbody>
                        {fileContent.map(row => (
                            <tr key={row.id}>
                                {row.map(cell => (
                                    <td key={cell.id}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table> : 'Please choose a CSV file!'}
                
            </div>
        );
    }  
}

export default DisplayData;

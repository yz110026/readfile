import React from 'react';

const DisplayData = ({ fileName, fileContent }) => {
  return (
    <div className='DisplayData'>
        {console.log({fileName, fileContent})}
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
        </table>
    </div>
  );
}

export default DisplayData;

import React from 'react';
import { FaTrashAlt} from 'react-icons/fa' 
import { GrDocumentCsv } from "react-icons/gr";
import { useStoreActions } from 'easy-peasy';
import { Link } from 'react-router-dom';

const FileItem = ({file}) => {
    const deleteFile = useStoreActions((actions) => actions.deleteFile);
    
  return (
    <li className='shadow p-3 mb-5 bg-body rounded' >
        
        <div className="card-body">
            <Link to={`/file/${file.id}`} >
                <label className="FileItem"> <GrDocumentCsv/> {file.fileName}</label>
            </Link>
            <FaTrashAlt 
                className='trashbutton'
                role="button" 
                tabIndex="0" 
                onClick={() => deleteFile(file.id)}
            />
        </div>
        
    </li>
  );
}

export default FileItem;

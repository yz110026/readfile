import React from 'react';
import { FaTrashAlt} from 'react-icons/fa';
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
            <div className='Card_options'>
                <div className="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Make Plots
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <li><Link to={`/line_chart/file/${file.id}`} className='dropdown-item'>Line Chart</Link></li>
                    <li><Link to={`/bar_chart/file/${file.id}`} className='dropdown-item'>Bar Chart</Link></li>
                    <li><Link to={`/percent_area_chart/file/${file.id}`} className='dropdown-item'>Percent Area Chart</Link></li>
                    <li><Link to={`/scatter_chart/file/${file.id}`} className='dropdown-item'>Scatter Chart</Link></li>
                    <li><Link to={`/swarm_chart/file/${file.id}`} class="dropdown-item disabled">More Chart</Link></li>

                    </ul>
                </div> 
                <FaTrashAlt 
                    className='trashbutton'
                    role="button" 
                    tabIndex="0" 
                    onClick={() => deleteFile(file.id)}
                />
            </div>
        </div>
        
    </li>
  );
}

export default FileItem;

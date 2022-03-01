import React from 'react'
import ReadCSVfile from './ReadCSVfile'
const Nav = ({ setFileName, setFileContent }) => {
  return (
    <nav>
        <ReadCSVfile
            setFileName = {setFileName}
            setFileContent = {setFileContent}
        />
    </nav>
  )
}

export default Nav

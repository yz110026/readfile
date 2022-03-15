import React from 'react'
import ReadCSVfile from './ReadCSVfile'
import { Link } from 'react-router-dom'
import FileReader from './FileReader'

const Nav = () => {

  return (
    <nav className='Nav'>
        <FileReader/>
        <ul className='NavUl'>
          <Link to="/"><li className='NavLi'>Files</li></Link>
        </ul>
    </nav>
  )
}

export default Nav

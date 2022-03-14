import React from 'react'
import ReadCSVfile from './ReadCSVfile'
import { Link } from 'react-router-dom'

const Nav = () => {

  return (
    <nav className='Nav'>
        <ReadCSVfile/>
        <ul className='NavUl'>
          <Link to="/"><li className='NavLi'>Files</li></Link>
        </ul>
    </nav>
  )
}

export default Nav

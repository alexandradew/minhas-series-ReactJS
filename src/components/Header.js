import React, { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
} from 'reactstrap'
import { Link } from 'react-router-dom'

const Header = () => {
  const [menuState, setMenuState] = useState(false)
  const toggleMenu = () => {
    setMenuState(!menuState)
  }
  return (
    <div>
      <Navbar color='primary' dark expand='md'>
        <div className='container'>
          <NavbarBrand tag={Link} to={'/'}><i className='fas fa-film'></i> Minhas séries </NavbarBrand>
          <NavbarToggler onClick={toggleMenu} />
          <Collapse isOpen={menuState} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink tag={Link} to={'/'}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={'/generos'}>Gêneros</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={'/series'}>Séries</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  )
}

export default Header
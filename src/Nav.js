import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

function Nav(routeProps) {
    console.log(routeProps);
  return (
    <nav>
      <ul className='sideBar-nav'>
        {routeProps.folders.map(folder =>
          <li className='sideBar-itm' key={folder.id}>
            <NavLink 
              className='sideBarNav-link'
              to={`/folder/${folder.id}`}>
                {folder.name}
            </NavLink>
          </li>
        )}
      </ul> <br />
        <NavLink 
          className='addFolder-button'
          to=''>
            Add folder
        </NavLink>
    </nav>
  );
}

export default Nav;
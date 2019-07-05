import React from 'react';
import { NavLink } from 'react-router-dom';
import STORE from './store';

function Nav() {
  return (
    <nav>
        <ul className='sideBar-nav'>
            {STORE.folders.map(folder =>
                <li key={folder.id}>
                    <NavLink 
                    className='sideBarNav-link'
                    to={`/folder/${folder.id}`}>
                        {folder.name}
                    </NavLink>
                </li>
               )}
            <li>
                <NavLink 
                className='addFolder-button'
                to=''>
                    Add folder
                </NavLink>
            </li>
        </ul>
    </nav>
  );
}

export default Nav;
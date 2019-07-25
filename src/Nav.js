import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NoteContext from './NoteContext';
import './Nav.css';

class Nav extends Component {
  static contextType = NoteContext;

  render() {
    const {folders=[]} = this.context;
    return (
        <nav>
          <ul className='sideBar-nav'>
            {folders.map(folder =>
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
              to='/add-folder'>
                Add folder
            </NavLink> <br />
            <NavLink 
              className='nav-addNote-btn'
              to= '/add-note'>
              Add note
            </NavLink>
        </nav>
    );
  }
}

export default Nav;
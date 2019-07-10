import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NoteContext from './NoteContext';
import './Nav.css';

class Nav extends Component {
  render() {
    const {folders=[]} = this.context;

    return (
      <NoteContext.Consumer>
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
              to=''>
                Add folder
            </NavLink>
        </nav>
      </NoteContext.Consumer>
    );
  }
}

export default Nav;
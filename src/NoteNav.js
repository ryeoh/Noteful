import React, { Component } from 'react';
import {findFolder, findNote} from './helpful-constants';
import NoteContext from './NoteContext';
import './NoteNav.css';

class NoteNav extends Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }

  static contextType = NoteContext; 

  render() {
    const {notes, folders} = this.context;
    const {noteId} = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);

    const folderName = () => 
      (folder !== undefined)
      ? <span>{folder.name}</span>
      : <span>Loading...</span>;

    return (
      <nav>
          <h3 className='noteNav-folderName'>
            {folderName(folder)}
          </h3>
          <button 
              className='go-back-btn'
              onClick={() => this.props.history.goBack()}>
              Go back
          </button>
      </nav>
    );
  }
}

export default NoteNav;